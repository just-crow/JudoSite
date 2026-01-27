'use server'

import { supabase } from '@/lib/supabase'
import { verifySession } from './auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile, uploadFileObject } from './file-upload'
import {
    isValidUUID,
    sanitizeString,
    isNonEmptyString,
    isValidDate,
    isValidURL
} from '@/lib/validation'
import { unstable_cache } from 'next/cache'

export interface GalleryAlbum {
    id: string
    title: string
    date: string
    coverImage: string
    images: string[]
}

// Supabase row type
interface GalleryRow {
    id: string
    title: string
    date: string
    cover_image: string | null
    images: string[] | null
}

/**
 * Maps a database row to GalleryAlbum interface
 */
function mapRowToAlbum(row: GalleryRow): GalleryAlbum {
    return {
        id: row.id,
        title: row.title,
        date: row.date,
        coverImage: row.cover_image || '',
        images: row.images || []
    }
}

/**
 * Gets all albums with caching
 */
export const getAlbums = unstable_cache(
    async (): Promise<GalleryAlbum[]> => {
        const { data, error } = await supabase
            .from('gallery')
            .select('*')
            .order('created_at', { ascending: false })

        if (error || !data) {
            if (process.env.NODE_ENV === 'development' && error) {
                console.error("Error fetching albums:", error.message)
            }
            return []
        }

        return (data as GalleryRow[]).map(mapRowToAlbum)
    },
    ['gallery'],
    { revalidate: 300, tags: ['gallery'] }
)

/**
 * Gets a single album by ID
 */
export async function getAlbum(id: string): Promise<GalleryAlbum | null> {
    // Validate UUID format
    if (!isValidUUID(id)) {
        return null
    }

    const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !data) return null

    return mapRowToAlbum(data as GalleryRow)
}

/**
 * Creates a new album (admin only)
 */
export async function createAlbum(formData: FormData): Promise<void> {
    await verifySession()

    const title = sanitizeString(formData.get('title') as string || '')
    const date = formData.get('date') as string || ''

    // Validate input
    if (!isNonEmptyString(title)) {
        console.error('Album title is required')
        return
    }

    if (!isValidDate(date)) {
        console.error('Invalid date format')
        return
    }

    // Check for file upload for cover image
    const file = formData.get('file') as File
    let coverImage = formData.get('coverImage') as string

    if (file && file.size > 0 && file.name !== 'undefined') {
        try {
            coverImage = await uploadFile(formData)
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                console.error("Cover upload failed", e)
            }
        }
    }

    const imagesInput = formData.get('images') as string
    const images = imagesInput ? imagesInput.split(',').map(s => s.trim()).filter(s => s) : []

    const newAlbum = {
        title,
        date,
        cover_image: coverImage || '',
        images: images.length > 0 ? images : (coverImage ? [coverImage] : [])
    }

    const { error } = await supabase.from('gallery').insert(newAlbum)

    if (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error creating album:", error.message)
        }
        return
    }

    revalidatePath('/admin/gallery')
    revalidatePath('/novosti/galerije')
    redirect('/admin/gallery')
}

/**
 * Updates an existing album (admin only)
 */
export async function updateAlbum(id: string, formData: FormData): Promise<void> {
    await verifySession()

    // Validate UUID format
    if (!isValidUUID(id)) {
        console.error('Invalid album ID format')
        return
    }

    const title = sanitizeString(formData.get('title') as string || '')
    const date = formData.get('date') as string || ''
    const coverImageInput = formData.get('coverImage') as string

    // Validate input
    if (!isNonEmptyString(title)) {
        console.error('Album title is required')
        return
    }

    // Check for new cover file
    const file = formData.get('file') as File
    let coverImage = coverImageInput

    if (file && file.size > 0 && file.name !== 'undefined') {
        try {
            coverImage = await uploadFile(formData)
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                console.error("Cover upload failed", e)
            }
        }
    }

    // Get existing album to check if cover needs fallback
    const existing = await getAlbum(id)
    if (!existing) {
        console.error('Album not found')
        return
    }

    const { error } = await supabase
        .from('gallery')
        .update({
            title,
            date,
            cover_image: coverImage || existing.coverImage
        })
        .eq('id', id)

    if (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error updating album:", error.message)
        }
        return
    }

    revalidatePath('/admin/gallery')
    revalidatePath(`/admin/gallery/${id}`)
    revalidatePath('/novosti/galerije')
    revalidatePath(`/novosti/galerije/${id}`)
}

/**
 * Adds images to an album (admin only)
 */
export async function addImagesToAlbum(id: string, formData: FormData): Promise<void> {
    await verifySession()

    // Validate UUID format
    if (!isValidUUID(id)) {
        console.error('Invalid album ID format')
        return
    }

    const album = await getAlbum(id)
    if (!album) {
        console.error('Album not found')
        return
    }

    const newImages: string[] = []

    // Handle Multiple Files Upload
    const files = formData.getAll('file') as File[]
    const validFiles = files.filter(f => f.size > 0 && f.name !== 'undefined')

    if (validFiles.length > 0) {
        try {
            // Upload all files in parallel
            const uploadPromises = validFiles.map(file => uploadFileObject(file))
            const uploadedUrls = await Promise.all(uploadPromises)
            newImages.push(...uploadedUrls)
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                console.error("Bulk upload failed", e)
            }
        }
    }

    // Handle URL input (legacy support or text input)
    const urlInput = formData.get('imageUrl') as string
    if (urlInput && isValidURL(urlInput)) {
        newImages.push(urlInput)
    }

    if (newImages.length > 0) {
        // Append to existing images
        const updatedImages = [...album.images, ...newImages]

        const { error } = await supabase
            .from('gallery')
            .update({ images: updatedImages })
            .eq('id', id)

        if (error) {
            if (process.env.NODE_ENV === 'development') {
                console.error("Error adding images:", error.message)
            }
            return
        }

        revalidatePath(`/admin/gallery/${id}`)
        revalidatePath(`/novosti/galerije/${id}`)
    }
}

/**
 * Removes an image from an album (admin only)
 */
export async function removeImageFromAlbum(id: string, imageUrl: string): Promise<void> {
    await verifySession()

    // Validate UUID format
    if (!isValidUUID(id)) {
        console.error('Invalid album ID format')
        return
    }

    const album = await getAlbum(id)
    if (!album) {
        console.error('Album not found')
        return
    }

    const updatedImages = album.images.filter(img => img !== imageUrl)

    const { error } = await supabase
        .from('gallery')
        .update({ images: updatedImages })
        .eq('id', id)

    if (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error removing image:", error.message)
        }
        return
    }

    revalidatePath(`/admin/gallery/${id}`)
    revalidatePath(`/novosti/galerije/${id}`)
}

/**
 * Deletes an album (admin only)
 */
export async function deleteAlbum(id: string): Promise<void> {
    await verifySession()

    // Validate UUID format
    if (!isValidUUID(id)) {
        console.error('Invalid album ID format')
        return
    }

    const { error } = await supabase.from('gallery').delete().eq('id', id)

    if (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error deleting album:", error.message)
        }
        return
    }

    revalidatePath('/admin/gallery')
    revalidatePath('/novosti/galerije')
}

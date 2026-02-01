'use server'

import { supabase } from '@/lib/supabase'
import { verifySession } from './auth'
import { revalidatePath, unstable_cache } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile, uploadFileObject } from './file-upload'
import { validateGalleryAlbumInput, sanitizeString, validateUUID } from '@/lib/validation'

export interface GalleryAlbum {
    id: string
    title: string
    date: string
    coverImage: string
    images: string[]
}

const fetchAlbums = async (): Promise<GalleryAlbum[]> => {
    const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false })

    if (error || !data) return []

    return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        date: item.date,
        coverImage: item.cover_image,
        images: item.images || []
    }))
}

export const getAlbums = unstable_cache(
    async () => fetchAlbums(),
    ['gallery_albums'],
    { revalidate: 300, tags: ['gallery'] }
)

export async function getAlbum(id: string): Promise<GalleryAlbum | null> {
    if (!validateUUID(id)) return null

    const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !data) return null

    return {
        id: data.id,
        title: data.title,
        date: data.date,
        coverImage: data.cover_image,
        images: data.images || []
    }
}

export async function createAlbum(formData: FormData): Promise<void> {
    await verifySession()

    const title = sanitizeString(formData.get('title') as string || '')
    const date = formData.get('date') as string || ''

    const validation = validateGalleryAlbumInput({ title, date })
    if (!validation.valid) {
        console.error('Validation failed:', validation.error)
        return
    }

    const file = formData.get('file') as File
    let coverImage = formData.get('coverImage') as string
    if (file && file.size > 0 && file.name !== 'undefined') {
        try {
            coverImage = await uploadFile(formData)
        } catch (e) {
            console.error("Cover upload failed", e)
        }
    }

    const imagesInput = formData.get('images') as string
    const images = imagesInput ? imagesInput.split(',').map(s => s.trim()).filter(s => s) : []

    const newAlbum = {
        title,
        date,
        cover_image: coverImage || 'https://images.unsplash.com/photo-1544367563-12123d832d34?auto=format&fit=crop&q=80',
        images: images.length > 0 ? images : (coverImage ? [coverImage] : [])
    }

    const { error } = await supabase.from('gallery').insert(newAlbum)

    if (error) {
        console.error("Error creating album", error)
        return
    }

    revalidatePath('/admin/gallery')
    revalidatePath('/novosti/galerije')
    redirect('/admin/gallery')
}

export async function updateAlbum(id: string, formData: FormData): Promise<void> {
    await verifySession()
    if (!validateUUID(id)) return

    const title = sanitizeString(formData.get('title') as string || '')
    const date = formData.get('date') as string || ''

    const validation = validateGalleryAlbumInput({ title, date })
    if (!validation.valid) {
        console.error('Validation failed:', validation.error)
        return
    }

    const coverImageInput = formData.get('coverImage') as string
    let coverImage = coverImageInput

    const file = formData.get('file') as File
    if (file && file.size > 0) {
        try {
            coverImage = await uploadFile(formData)
        } catch (e) {
            console.error("Cover upload failed", e)
        }
    }

    const imagesInput = formData.get('images') as string
    const images = imagesInput ? imagesInput.split(',').map(s => s.trim()).filter(s => s) : []

    const updatedAlbum = {
        title,
        date,
        cover_image: coverImage,
        images
    }

    const { error } = await supabase.from('gallery').update(updatedAlbum).eq('id', id)

    if (error) {
        console.error("Error updating album", error)
        return
    }

    revalidatePath('/admin/gallery')
    revalidatePath('/novosti/galerije')
    revalidatePath(`/novosti/galerije/${id}`)
    redirect('/admin/gallery')
}

export async function deleteAlbum(id: string): Promise<void> {
    await verifySession()
    if (!validateUUID(id)) return

    const { error } = await supabase.from('gallery').delete().eq('id', id)

    if (error) {
        console.error("Error deleting album", error)
        return
    }

    revalidatePath('/admin/gallery')
    revalidatePath('/novosti/galerije')
}

export async function addImagesToAlbum(id: string, formData: FormData): Promise<void> {
    await verifySession()
    if (!validateUUID(id)) return

    const album = await getAlbum(id)
    if (!album) return

    let newImages: string[] = []

    // 1. Check for manual URL
    const imageUrl = sanitizeString(formData.get('imageUrl') as string || '')
    if (imageUrl) {
        newImages.push(imageUrl)
    }

    // 2. Check for uploaded files (bulk)
    const files = formData.getAll('file') as File[]
    if (files.length > 0) {
        const uploadPromises = files
            .filter(f => f.size > 0 && f.name !== 'undefined')
            .map(f => uploadFileObject(f))

        try {
            const uploadedUrls = await Promise.all(uploadPromises)
            newImages.push(...uploadedUrls)
        } catch (e) {
            console.error("Bulk upload failed", e)
        }
    }

    if (newImages.length === 0) return

    const updatedImages = [...album.images, ...newImages]

    const { error } = await supabase
        .from('gallery')
        .update({ images: updatedImages })
        .eq('id', id)

    if (error) {
        console.error("Error adding images", error)
        return
    }

    revalidatePath(`/novosti/galerije/${id}`)
    revalidatePath('/admin/gallery')
}

export async function removeImageFromAlbum(id: string, imageToRemove: string): Promise<void> {
    await verifySession()
    if (!validateUUID(id)) return

    const album = await getAlbum(id)
    if (!album) return

    const updatedImages = album.images.filter(img => img !== imageToRemove)

    const { error } = await supabase
        .from('gallery')
        .update({ images: updatedImages })
        .eq('id', id)

    if (error) {
        console.error("Error removing image", error)
        return
    }

    revalidatePath(`/novosti/galerije/${id}`)
    revalidatePath('/admin/gallery')
}

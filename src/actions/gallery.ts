'use server'

import { supabase } from '@/lib/supabase'
import { verifySession } from './auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile, uploadFileObject } from './file-upload'

export interface GalleryAlbum {
    id: string
    title: string
    date: string
    coverImage: string
    images: string[]
}

export async function getAlbums(): Promise<GalleryAlbum[]> {
    const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false })

    if (error || !data) return []

    // Map DB snake_case to CamelCase
    return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        date: item.date,
        coverImage: item.cover_image,
        images: item.images || []
    }))
}

export async function getAlbum(id: string): Promise<GalleryAlbum | null> {
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

export async function createAlbum(formData: FormData) {
    await verifySession()

    const title = formData.get('title') as string
    const date = formData.get('date') as string

    // Check for file upload for cover image
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
        images: images.length > 0 ? images : [coverImage]
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

export async function updateAlbum(id: string, formData: FormData) {
    await verifySession()

    const title = formData.get('title') as string
    const date = formData.get('date') as string
    const coverImageInput = formData.get('coverImage') as string

    // Check for new cover file
    const file = formData.get('file') as File
    let coverImage = coverImageInput

    if (file && file.size > 0 && file.name !== 'undefined') {
        try {
            coverImage = await uploadFile(formData)
        } catch (e) {
            console.error("Cover upload failed", e)
        }
    }

    // Get existing album to check if cover needs fallback
    const existing = await getAlbum(id)
    if (!existing) return

    const { error } = await supabase
        .from('gallery')
        .update({
            title,
            date,
            cover_image: coverImage || existing.coverImage
        })
        .eq('id', id)

    if (error) {
        console.error("Error updating album", error)
        return
    }

    revalidatePath('/admin/gallery')
    revalidatePath(`/admin/gallery/${id}`)
    revalidatePath('/novosti/galerije')
    revalidatePath(`/novosti/galerije/${id}`)
}

export async function addImagesToAlbum(id: string, formData: FormData) {
    await verifySession()

    const album = await getAlbum(id)
    if (!album) return

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
            console.error("Bulk upload failed", e)
        }
    }

    // Handle URL input (legacy support or text input)
    const urlInput = formData.get('imageUrl') as string
    if (urlInput) {
        newImages.push(urlInput)
    }

    if (newImages.length > 0) {
        // Append to existing images
        const updatedImages = [...album.images, ...newImages]

        await supabase
            .from('gallery')
            .update({ images: updatedImages })
            .eq('id', id)

        revalidatePath(`/admin/gallery/${id}`)
        revalidatePath(`/novosti/galerije/${id}`)
    }
}

export async function removeImageFromAlbum(id: string, imageUrl: string) {
    await verifySession()

    const album = await getAlbum(id)
    if (!album) return

    const updatedImages = album.images.filter(img => img !== imageUrl)

    await supabase
        .from('gallery')
        .update({ images: updatedImages })
        .eq('id', id)

    revalidatePath(`/admin/gallery/${id}`)
    revalidatePath(`/novosti/galerije/${id}`)
}

export async function deleteAlbum(id: string) {
    await verifySession()

    await supabase.from('gallery').delete().eq('id', id)

    revalidatePath('/admin/gallery')
    revalidatePath('/novosti/galerije')
}

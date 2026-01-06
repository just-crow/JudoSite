'use server'

import fs from 'fs/promises'
import path from 'path'
import { verifySession } from './auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile } from './file-upload'

const DATA_FILE = path.join(process.cwd(), 'src/data/gallery.json')

export interface GalleryAlbum {
    id: string
    title: string
    date: string
    coverImage: string
    images: string[]
}

export async function getAlbums(): Promise<GalleryAlbum[]> {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

export async function getAlbum(id: string): Promise<GalleryAlbum | null> {
    const albums = await getAlbums()
    return albums.find(a => a.id === id) || null
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

    const newAlbum: GalleryAlbum = {
        id: Date.now().toString(),
        title,
        date,
        coverImage: coverImage || 'https://images.unsplash.com/photo-1544367563-12123d832d34?auto=format&fit=crop&q=80',
        images: images.length > 0 ? images : [coverImage]
    }

    const albums = await getAlbums()
    albums.unshift(newAlbum)

    await fs.writeFile(DATA_FILE, JSON.stringify(albums, null, 2))
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

    const albums = await getAlbums()
    const index = albums.findIndex(a => a.id === id)

    if (index !== -1) {
        albums[index] = {
            ...albums[index],
            title,
            date,
            coverImage: coverImage || albums[index].coverImage
        }
        await fs.writeFile(DATA_FILE, JSON.stringify(albums, null, 2))
        revalidatePath('/admin/gallery')
        revalidatePath(`/admin/gallery/${id}`)
        revalidatePath('/novosti/galerije')
        revalidatePath(`/novosti/galerije/${id}`)
    }
}

export async function addImagesToAlbum(id: string, formData: FormData) {
    await verifySession()

    const albums = await getAlbums()
    const index = albums.findIndex(a => a.id === id)

    if (index === -1) return

    const newImages: string[] = []

    // Handle File Upload
    const file = formData.get('file') as File
    if (file && file.size > 0 && file.name !== 'undefined') {
        try {
            const url = await uploadFile(formData)
            newImages.push(url)
        } catch (e) {
            console.error("Image upload failed", e)
        }
    }

    // Handle URL input
    const urlInput = formData.get('imageUrl') as string
    if (urlInput) {
        newImages.push(urlInput)
    }

    if (newImages.length > 0) {
        albums[index].images = [...albums[index].images, ...newImages]
        await fs.writeFile(DATA_FILE, JSON.stringify(albums, null, 2))
        revalidatePath(`/admin/gallery/${id}`)
        revalidatePath(`/novosti/galerije/${id}`)
    }
}

export async function removeImageFromAlbum(id: string, imageUrl: string) {
    await verifySession()

    const albums = await getAlbums()
    const index = albums.findIndex(a => a.id === id)

    if (index !== -1) {
        albums[index].images = albums[index].images.filter(img => img !== imageUrl)
        await fs.writeFile(DATA_FILE, JSON.stringify(albums, null, 2))
        revalidatePath(`/admin/gallery/${id}`)
        revalidatePath(`/novosti/galerije/${id}`)
    }
}

export async function deleteAlbum(id: string) {
    await verifySession()

    const albums = await getAlbums()
    const filtered = albums.filter(item => item.id !== id)

    await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2))
    revalidatePath('/admin/gallery')
    revalidatePath('/novosti/galerije')
}

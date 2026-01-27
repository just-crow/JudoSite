'use server'

import { supabase } from '@/lib/supabase'
import { verifySession } from './auth'

export async function uploadFileObject(file: File): Promise<string> {
    await verifySession()

    // Basic validation
    if (!file.type.startsWith('image/')) {
        throw new Error('Only images are allowed')
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error('File size too large (max 5MB)')
    }

    const uniqueId = Date.now().toString() + Math.random().toString(36).substring(7)
    const extension = file.name.split('.').pop()
    const filename = `${uniqueId}.${extension}`

    // Convert File to ArrayBuffer for Supabase
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { data, error } = await supabase
        .storage
        .from('uploads')
        .upload(filename, buffer, {
            contentType: file.type,
            upsert: false
        })

    if (error) {
        console.error('Supabase Storage Error:', error)
        throw new Error('Upload failed')
    }

    const { data: { publicUrl } } = supabase
        .storage
        .from('uploads')
        .getPublicUrl(filename)

    return publicUrl
}

export async function uploadFile(formData: FormData): Promise<string> {
    await verifySession()

    const file = formData.get('file') as File

    if (!file) {
        throw new Error('No file uploaded')
    }

    return uploadFileObject(file)
}

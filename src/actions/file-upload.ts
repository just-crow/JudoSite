'use server'

import { supabase } from '@/lib/supabase'

export async function uploadFile(formData: FormData): Promise<string> {
    const file = formData.get('file') as File

    if (!file) {
        throw new Error('No file uploaded')
    }

    const uniqueId = Date.now().toString()
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

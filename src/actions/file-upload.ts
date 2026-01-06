'use server'

import { writeFile } from 'fs/promises'
import { join } from 'path'
import { verifySession } from './auth'

export async function uploadFile(formData: FormData) {
    await verifySession()

    const file = formData.get('file') as File
    if (!file) {
        throw new Error('No file uploaded')
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename to avoid collisions
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const filename = uniquePrefix + '-' + file.name.replace(/[^a-zA-Z0-9.-]/g, '')

    // Ensure public/uploads directory exists (or assume it does, better to be safe in real app)
    // For now we save to public/uploads
    const uploadDir = join(process.cwd(), 'public', 'uploads')
    // Note: Ensure 'public/uploads' exists manually or check in code. 
    // Node's fs/promises doesn't have existSync easily without try/catch, 
    // but for this environment let's assume valid path or simple write.

    // Actually, let's try to mkdir just in case
    try {
        const fs = require('fs')
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
    } catch (e) {
        console.error("Error creating directory", e)
    }

    const path = join(uploadDir, filename)
    await writeFile(path, buffer)

    // Return the public URL
    return `/uploads/${filename}`
}

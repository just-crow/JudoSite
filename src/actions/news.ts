'use server'

import fs from 'fs/promises'
import path from 'path'
import { verifySession } from './auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile } from './file-upload'

const DATA_FILE = path.join(process.cwd(), 'src/data/news.json')

export interface NewsItem {
    id: string
    title: string
    date: string
    excerpt: string
    content: string
    image: string
    tags: string[]
    featured: boolean
}

export async function getNews(): Promise<NewsItem[]> {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

export async function addNews(formData: FormData) {
    await verifySession()

    const title = formData.get('title') as string
    const date = formData.get('date') as string
    const content = formData.get('content') as string
    const featured = formData.get('featured') === 'on'

    // Check for file upload
    const file = formData.get('file') as File
    let image = formData.get('image') as string // fallback to URL if provided

    if (file && file.size > 0 && file.name !== 'undefined') {
        try {
            image = await uploadFile(formData)
        } catch (e) {
            console.error("Upload failed", e)
            // fallback to placeholder or keep url
        }
    }

    const newItem: NewsItem = {
        id: Date.now().toString(),
        title,
        date,
        excerpt: content.substring(0, 100) + '...',
        content,
        image: image || 'https://images.unsplash.com/photo-1544367563-12123d832d34?auto=format&fit=crop&q=80',
        tags: ['Novosti'],
        featured
    }

    const news = await getNews()
    news.unshift(newItem)

    await fs.writeFile(DATA_FILE, JSON.stringify(news, null, 2))
    revalidatePath('/admin/news')
    revalidatePath('/novosti')
    revalidatePath('/') // Revalidate homepage too
    redirect('/admin/news')
}

export async function deleteNews(id: string) {
    await verifySession()

    const news = await getNews()
    const filtered = news.filter(item => item.id !== id)

    await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2))
    revalidatePath('/admin/news')
    revalidatePath('/novosti')
    revalidatePath('/')
}

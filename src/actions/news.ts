'use server'

import { supabase } from '@/lib/supabase'
import { verifySession } from './auth'
import { revalidatePath, unstable_cache } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile } from './file-upload'
import { validateNewsInput, sanitizeString, validateUUID, validateDate } from '@/lib/validation'

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

const fetchNews = async (): Promise<NewsItem[]> => {
    const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching news:', error)
        return []
    }
    if (!data) return []

    return data as NewsItem[]
}

export const getNews = unstable_cache(
    async () => fetchNews(),
    ['news'],
    { revalidate: 300, tags: ['news'] }
)

export async function addNews(formData: FormData): Promise<void> {
    await verifySession()

    const title = sanitizeString(formData.get('title') as string || '')
    const date = formData.get('date') as string || ''
    const content = sanitizeString(formData.get('content') as string || '')
    const featured = formData.get('featured') === 'on'

    const validation = validateNewsInput({ title, content })
    if (!validation.valid) {
        console.error('Validation failed:', validation.error)
        return
    }
    if (!validateDate(date)) {
        console.error('Invalid date')
        return
    }

    // File Upload
    const file = formData.get('file') as File
    let image = formData.get('image') as string // fallback to URL
    if (file && file.size > 0 && file.name !== 'undefined') {
        try {
            image = await uploadFile(formData)
        } catch (e) {
            console.error("Upload failed", e)
        }
    }

    const newItem = {
        title,
        date,
        excerpt: content.substring(0, 100) + '...',
        content,
        image: image || 'https://images.unsplash.com/photo-1544367563-12123d832d34?auto=format&fit=crop&q=80',
        tags: ['Novosti'],
        featured
    }

    const { error } = await supabase.from('news').insert(newItem)

    if (error) {
        console.error('Error adding news:', error)
        return
    }

    revalidatePath('/admin/news')
    revalidatePath('/novosti')
    revalidatePath('/')
    redirect('/admin/news')
}

export async function deleteNews(id: string): Promise<void> {
    await verifySession()
    if (!validateUUID(id)) return

    const { error } = await supabase.from('news').delete().eq('id', id)

    if (error) {
        console.error('Error deleting news:', error)
        return
    }

    revalidatePath('/admin/news')
    revalidatePath('/novosti')
    revalidatePath('/')
}

export async function getNewsItem(id: string) {
    if (!validateUUID(id)) return undefined

    const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !data) return undefined
    return data as NewsItem
}

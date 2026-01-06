'use server'

import { supabase } from '@/lib/supabase'
import { verifySession } from './auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile } from './file-upload'

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
    const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching news:', error)
        return []
    }

    return data as NewsItem[]
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

    const { error } = await supabase
        .from('news')
        .insert(newItem)

    if (error) {
        console.error('Error adding news:', error)
        return
    }

    revalidatePath('/admin/news')
    revalidatePath('/novosti')
    revalidatePath('/') // Revalidate homepage too
    redirect('/admin/news')
}

export async function deleteNews(id: string) {
    await verifySession()

    const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting news:', error)
        return
    }

    revalidatePath('/admin/news')
    revalidatePath('/novosti')
    revalidatePath('/')
}

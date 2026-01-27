'use server'

import { supabase } from '@/lib/supabase'
import { verifySession } from './auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile } from './file-upload'
import {
    isValidUUID,
    validateNewsInput,
    sanitizeString
} from '@/lib/validation'
import { unstable_cache } from 'next/cache'

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

// Supabase row type
interface NewsRow {
    id: string
    title: string
    date: string
    excerpt: string | null
    content: string
    image: string | null
    tags: string[] | null
    featured: boolean
}

/**
 * Maps a database row to NewsItem interface
 */
function mapRowToNewsItem(row: NewsRow): NewsItem {
    return {
        id: row.id,
        title: row.title,
        date: row.date,
        excerpt: row.excerpt || '',
        content: row.content,
        image: row.image || '',
        tags: row.tags || [],
        featured: row.featured || false
    }
}

/**
 * Gets all news items with caching
 */
export const getNews = unstable_cache(
    async (): Promise<NewsItem[]> => {
        const { data, error } = await supabase
            .from('news')
            .select('*')
            .order('created_at', { ascending: false })

        if (error || !data) {
            if (process.env.NODE_ENV === 'development' && error) {
                console.error("Error fetching news:", error.message)
            }
            return []
        }

        return (data as NewsRow[]).map(mapRowToNewsItem)
    },
    ['news'],
    { revalidate: 300, tags: ['news'] }
)

/**
 * Creates a new news item (admin only)
 */
export async function addNews(formData: FormData): Promise<void> {
    await verifySession()

    const title = sanitizeString(formData.get('title') as string || '')
    const date = formData.get('date') as string || ''
    const content = formData.get('content') as string || ''
    const featured = formData.get('featured') === 'on'

    // Validate input
    const validation = validateNewsInput({ title, content })
    if (!validation.valid) {
        console.error('Validation failed:', validation.error)
        return
    }

    // Check for file upload
    const file = formData.get('file') as File
    let image = formData.get('image') as string // fallback to URL if provided

    if (file && file.size > 0 && file.name !== 'undefined') {
        try {
            image = await uploadFile(formData)
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                console.error("Upload failed", e)
            }
        }
    }

    // Create excerpt from content (sanitize HTML)
    const sanitizedContent = sanitizeString(content)
    const excerpt = sanitizedContent.substring(0, 100) + '...'

    const newItem = {
        title,
        date,
        excerpt,
        content: sanitizedContent,
        image: image || '',
        tags: ['Novosti'],
        featured
    }

    const { error } = await supabase
        .from('news')
        .insert(newItem)

    if (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error adding news:", error.message)
        }
        return
    }

    revalidatePath('/admin/news')
    revalidatePath('/novosti')
    revalidatePath('/')
    redirect('/admin/news')
}

/**
 * Deletes a news item (admin only)
 */
export async function deleteNews(id: string): Promise<void> {
    await verifySession()

    // Validate UUID format
    if (!isValidUUID(id)) {
        console.error('Invalid news ID format')
        return
    }

    const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id)

    if (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error deleting news:", error.message)
        }
        return
    }

    revalidatePath('/admin/news')
    revalidatePath('/novosti')
    revalidatePath('/')
}

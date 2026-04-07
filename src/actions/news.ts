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
    display_order: number
}

const fetchNews = async (): Promise<NewsItem[]> => {
    const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('featured', { ascending: false })
        .order('date', { ascending: false })

    if (error) {
        console.error('Error fetching news:', error)
        return []
    }
    if (!data) return []

    // Sort client-side so display_order is respected as well
    const items = data as NewsItem[]
    const featured = items.filter(n => n.featured).sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
    const normal = items.filter(n => !n.featured).sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
    return [...featured, ...normal]
}

export const getNews = unstable_cache(
    async () => fetchNews(),
    ['news'],
    { revalidate: 300, tags: ['news'] }
)

export async function addNews(formData: FormData): Promise<{ error?: string } | void> {
    await verifySession()

    const title = sanitizeString(formData.get('title') as string || '')
    const rawDate = (formData.get('date') as string || '').trim()
    const content = sanitizeString(formData.get('content') as string || '')
    const featured = formData.get('featured') === 'on'

    const validation = validateNewsInput({ title, content })
    if (!validation.valid) {
        return { error: validation.error }
    }

    // Accept DD.MM.YYYY from the form, convert to YYYY-MM-DD for the DB
    const dateMatch = rawDate.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/)
    let date: string
    if (dateMatch) {
        const day = dateMatch[1].padStart(2, '0')
        const month = dateMatch[2].padStart(2, '0')
        date = `${dateMatch[3]}-${month}-${day}`
    } else if (validateDate(rawDate)) {
        date = rawDate
    } else {
        return { error: 'Neispravan format datuma. Koristite DD.MM.GGGG (npr. 12.03.2025)' }
    }

    // File Upload
    const file = formData.get('file') as File
    let image = formData.get('image') as string // fallback to URL
    if (file && file.size > 0 && file.name !== 'undefined') {
        try {
            image = await uploadFile(formData)
        } catch (e) {
            console.error("Upload failed", e)
            return { error: 'Greška pri uploadu slike' }
        }
    }

    const allNews = await fetchNews()
    const nextOrder = allNews.length > 0 ? Math.max(...allNews.map(n => n.display_order ?? 0)) + 1 : 0

    const newItem = {
        title,
        date,
        excerpt: content.substring(0, 100) + '...',
        content,
        image: image || 'https://images.unsplash.com/photo-1544367563-12123d832d34?auto=format&fit=crop&q=80',
        tags: ['Novosti'],
        featured,
        display_order: nextOrder,
    }

    const { error } = await supabase.from('news').insert(newItem)

    if (error) {
        console.error('Error adding news:', error)
        return { error: `Greška pri spremanju: ${error.message}` }
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

export async function toggleFeatured(id: string): Promise<void> {
    await verifySession()
    if (!validateUUID(id)) return

    const { data, error } = await supabase
        .from('news')
        .select('featured')
        .eq('id', id)
        .single()

    if (error || !data) return

    const { error: updateError } = await supabase
        .from('news')
        .update({ featured: !data.featured })
        .eq('id', id)

    if (updateError) {
        console.error('Error toggling featured:', updateError)
        return
    }

    revalidatePath('/admin/news')
    revalidatePath('/novosti')
    revalidatePath('/')
}

export async function reorderNews(orderedIds: string[]): Promise<void> {
    await verifySession()

    for (let i = 0; i < orderedIds.length; i++) {
        if (!validateUUID(orderedIds[i])) continue
        const { error } = await supabase
            .from('news')
            .update({ display_order: i })
            .eq('id', orderedIds[i])

        if (error) {
            console.error(`Error reordering item ${orderedIds[i]}:`, error)
        }
    }

    revalidatePath('/admin/news')
    revalidatePath('/novosti')
    revalidatePath('/')
}

'use server'

import { supabase } from '@/lib/supabase'
import { verifySession } from './auth'
import { revalidatePath, unstable_cache } from 'next/cache'
import { redirect } from 'next/navigation'
import { validateCompetitionInput, sanitizeString, validateUUID } from '@/lib/validation'

export interface Competition {
    id: string
    title: string
    date: string
    location: string
    description: string
    registrationLink: string
}

const fetchCompetitions = async (options: { limit?: number; upcoming?: boolean } = {}): Promise<Competition[]> => {
    let query = supabase
        .from('competitions')
        .select('*')
        .order('date', { ascending: true }) // Usually want upcoming first

    if (options.upcoming) {
        const today = new Date().toISOString().split('T')[0]
        query = query.gte('date', today)
    }

    if (options.limit) {
        query = query.limit(options.limit)
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching competitions:', error)
        return []
    }

    if (!data) return []

    return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        date: item.date,
        location: item.location,
        description: item.description,
        registrationLink: item.application_link || ''
    }))
}

export const getCompetitions = unstable_cache(
    async (options = {}) => fetchCompetitions(options),
    ['competitions'],
    { revalidate: 300, tags: ['competitions'] }
)

export async function getCompetition(id: string): Promise<Competition | undefined> {
    if (!validateUUID(id)) return undefined

    const { data, error } = await supabase
        .from('competitions')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !data) return undefined

    return {
        id: data.id,
        title: data.title,
        date: data.date,
        location: data.location,
        description: data.description,
        registrationLink: data.application_link || ''
    }
}

export async function createCompetition(formData: FormData): Promise<void> {
    await verifySession()

    const title = sanitizeString(formData.get('title') as string || '')
    const date = formData.get('date') as string || ''
    const location = sanitizeString(formData.get('location') as string || '')
    const description = sanitizeString(formData.get('description') as string || '')
    const registrationLink = (formData.get('registrationLink') as string || '').trim()

    const validation = validateCompetitionInput({ title, date, location, description, registrationLink })
    if (!validation.valid) {
        console.error('Validation failed:', validation.error)
        return
    }

    const newItem = {
        title,
        date,
        location,
        description,
        application_link: registrationLink || null
    }

    const { error } = await supabase.from('competitions').insert(newItem)

    if (error) {
        console.error("Error creating competition:", error.message)
        return
    }

    revalidatePath('/')
    revalidatePath('/kalendar')
    revalidatePath('/admin/competitions')
    redirect('/admin/competitions')
}

export async function updateCompetition(id: string, formData: FormData): Promise<void> {
    await verifySession()

    if (!validateUUID(id)) {
        console.error('Invalid ID format')
        return
    }

    const title = sanitizeString(formData.get('title') as string || '')
    const date = formData.get('date') as string || ''
    const location = sanitizeString(formData.get('location') as string || '')
    const description = sanitizeString(formData.get('description') as string || '')
    const registrationLink = (formData.get('registrationLink') as string || '').trim()

    const validation = validateCompetitionInput({ title, date, location, description, registrationLink })
    if (!validation.valid) {
        console.error('Validation failed:', validation.error)
        return
    }

    const updatedItem = {
        title,
        date,
        location,
        description,
        application_link: registrationLink || null
    }

    const { error } = await supabase
        .from('competitions')
        .update(updatedItem)
        .eq('id', id)

    if (error) {
        console.error("Error updating competition:", error.message)
        return
    }

    revalidatePath('/')
    revalidatePath('/kalendar')
    revalidatePath('/admin/competitions')
    redirect('/admin/competitions')
}

export async function deleteCompetition(id: string): Promise<void> {
    await verifySession()

    if (!validateUUID(id)) {
        console.error('Invalid ID format')
        return
    }

    const { error } = await supabase
        .from('competitions')
        .delete()
        .eq('id', id)

    if (error) {
        console.error("Error deleting competition:", error.message)
        return
    }

    revalidatePath('/')
    revalidatePath('/kalendar')
    revalidatePath('/admin/competitions')
}

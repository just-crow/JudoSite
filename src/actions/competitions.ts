'use server'

import { supabase } from '@/lib/supabase'
import { verifySession } from './auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {
    isValidUUID,
    validateCompetitionInput,
    sanitizeString
} from '@/lib/validation'
import { unstable_cache } from 'next/cache'

export interface Competition {
    id: string
    title: string
    date: string
    location: string
    description: string
    registrationLink: string
}

export interface GetCompetitionsOptions {
    upcomingOnly?: boolean;
    limit?: number;
}

// Supabase row type
interface CompetitionRow {
    id: string
    title: string
    date: string
    location: string
    description: string
    application_link: string | null
}

/**
 * Maps a database row to Competition interface
 */
function mapRowToCompetition(row: CompetitionRow): Competition {
    return {
        id: row.id,
        title: row.title,
        date: row.date,
        location: row.location,
        description: row.description || '',
        registrationLink: row.application_link || ''
    }
}

/**
 * Fetches competitions with optional caching
 */
async function fetchCompetitions(options: GetCompetitionsOptions = {}): Promise<Competition[]> {
    let query = supabase
        .from('competitions')
        .select('*');

    if (options.upcomingOnly) {
        const today = new Date().toISOString().split('T')[0];
        query = query.gte('date', today)
            .order('date', { ascending: true });
    } else {
        query = query.order('date', { ascending: false });
    }

    if (options.limit) {
        query = query.limit(options.limit);
    }

    const { data, error } = await query;

    if (error || !data) {
        // Log error in development only
        if (process.env.NODE_ENV === 'development' && error) {
            console.error("Error fetching competitions:", error.message)
        }
        return []
    }

    return (data as CompetitionRow[]).map(mapRowToCompetition)
}

/**
 * Gets all competitions with caching (5 minute revalidation)
 */
export const getCompetitions = unstable_cache(
    async (options: GetCompetitionsOptions = {}): Promise<Competition[]> => {
        return fetchCompetitions(options)
    },
    ['competitions'],
    { revalidate: 300, tags: ['competitions'] }
)

/**
 * Creates a new competition (admin only)
 */
export async function createCompetition(formData: FormData): Promise<void> {
    await verifySession()

    const title = sanitizeString(formData.get('title') as string || '')
    const date = formData.get('date') as string || ''
    const location = sanitizeString(formData.get('location') as string || '')
    const description = sanitizeString(formData.get('description') as string || '')
    const registrationLink = (formData.get('registrationLink') as string || '').trim()

    // Validate input
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
        if (process.env.NODE_ENV === 'development') {
            console.error("Error creating competition:", error.message)
        }
        return
    }

    revalidatePath('/')
    revalidatePath('/kalendar')
    revalidatePath('/admin/competitions')
    redirect('/admin/competitions')
}

/**
 * Gets a single competition by ID
 */
export async function getCompetition(id: string): Promise<Competition | null> {
    // Validate UUID format to prevent injection
    if (!isValidUUID(id)) {
        return null
    }

    const { data, error } = await supabase
        .from('competitions')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !data) return null

    return mapRowToCompetition(data as CompetitionRow)
}

/**
 * Updates an existing competition (admin only)
 */
export async function updateCompetition(id: string, formData: FormData): Promise<void> {
    await verifySession()

    // Validate UUID format
    if (!isValidUUID(id)) {
        console.error('Invalid competition ID format')
        return
    }

    const title = sanitizeString(formData.get('title') as string || '')
    const date = formData.get('date') as string || ''
    const location = sanitizeString(formData.get('location') as string || '')
    const description = sanitizeString(formData.get('description') as string || '')
    const registrationLink = (formData.get('registrationLink') as string || '').trim()

    // Validate input
    const validation = validateCompetitionInput({ title, date, location, description, registrationLink })
    if (!validation.valid) {
        console.error('Validation failed:', validation.error)
        return
    }

    const { error } = await supabase
        .from('competitions')
        .update({
            title,
            date,
            location,
            description,
            application_link: registrationLink || null
        })
        .eq('id', id)

    if (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error updating competition:", error.message)
        }
        return
    }

    revalidatePath('/')
    revalidatePath('/kalendar')
    revalidatePath('/admin/competitions')
    redirect('/admin/competitions')
}

/**
 * Deletes a competition (admin only)
 */
export async function deleteCompetition(id: string): Promise<void> {
    await verifySession()

    // Validate UUID format
    if (!isValidUUID(id)) {
        console.error('Invalid competition ID format')
        return
    }

    const { error } = await supabase.from('competitions').delete().eq('id', id)

    if (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error deleting competition:", error.message)
        }
        return
    }

    revalidatePath('/kalendar')
    revalidatePath('/admin/competitions')
}

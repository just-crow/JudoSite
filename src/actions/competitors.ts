'use server'

import { supabase } from '@/lib/supabase'
import { verifySession } from './auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile } from './file-upload'
import {
    isValidUUID,
    validateCompetitorInput,
    sanitizeString
} from '@/lib/validation'
import { unstable_cache } from 'next/cache'

export interface Competitor {
    id: string
    name: string
    category: string
    ageGroup: string
    rank: string
    image: string
    description: string
    achievements: string[]
}

// Supabase row type
interface CompetitorRow {
    id: string
    first_name: string
    last_name: string
    category: string | null
    birth_year: string | null
    belt: string | null
    image: string | null
    results: string | null
}

/**
 * Maps a database row to Competitor interface
 */
function mapRowToCompetitor(row: CompetitorRow): Competitor {
    return {
        id: row.id,
        name: `${row.first_name} ${row.last_name}`.trim(),
        category: row.category || '',
        ageGroup: row.birth_year || '',
        rank: row.belt || '',
        description: '',
        image: row.image || '',
        achievements: row.results ? row.results.split('\n').filter(Boolean) : []
    }
}

/**
 * Gets all competitors with caching
 */
export const getCompetitors = unstable_cache(
    async (): Promise<Competitor[]> => {
        const { data, error } = await supabase
            .from('competitors')
            .select('*')
            .order('created_at', { ascending: false })

        if (error || !data) {
            if (process.env.NODE_ENV === 'development' && error) {
                console.error("Error fetching competitors:", error.message)
            }
            return []
        }

        return (data as CompetitorRow[]).map(mapRowToCompetitor)
    },
    ['competitors'],
    { revalidate: 300, tags: ['competitors'] }
)

/**
 * Creates a new competitor (admin only)
 */
export async function createCompetitor(formData: FormData): Promise<void> {
    await verifySession()

    const name = sanitizeString(formData.get('name') as string || '')
    const category = sanitizeString(formData.get('category') as string || '')
    const ageGroup = sanitizeString(formData.get('ageGroup') as string || '')
    const rank = sanitizeString(formData.get('rank') as string || '')

    // Validate input
    const validation = validateCompetitorInput({ name })
    if (!validation.valid) {
        console.error('Validation failed:', validation.error)
        return
    }

    // Split name
    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ') || ''

    // Image Upload
    let image = ''
    const file = formData.get('file') as File
    if (file && file.size > 0) {
        try {
            image = await uploadFile(formData)
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                console.error("Upload failed", e)
            }
        }
    }

    const newItem = {
        first_name: firstName,
        last_name: lastName,
        category,
        birth_year: ageGroup,
        belt: rank,
        image,
        results: ''
    }

    const { error } = await supabase.from('competitors').insert(newItem)

    if (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error creating competitor:", error.message)
        }
        return
    }

    revalidatePath('/takmicari')
    revalidatePath('/admin/competitors')
    redirect('/admin/competitors')
}

/**
 * Gets a single competitor by ID
 */
export async function getCompetitor(id: string): Promise<Competitor | undefined> {
    // Validate UUID format
    if (!isValidUUID(id)) {
        return undefined
    }

    const { data, error } = await supabase
        .from('competitors')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !data) return undefined

    return mapRowToCompetitor(data as CompetitorRow)
}

/**
 * Updates an existing competitor (admin only)
 */
export async function updateCompetitor(id: string, formData: FormData): Promise<void> {
    await verifySession()

    // Validate UUID format
    if (!isValidUUID(id)) {
        console.error('Invalid competitor ID format')
        return
    }

    const name = sanitizeString(formData.get('name') as string || '')
    const category = sanitizeString(formData.get('category') as string || '')
    const ageGroup = sanitizeString(formData.get('ageGroup') as string || '')
    const rank = sanitizeString(formData.get('rank') as string || '')

    // Validate input
    const validation = validateCompetitorInput({ name })
    if (!validation.valid) {
        console.error('Validation failed:', validation.error)
        return
    }

    // Split name
    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ') || ''

    // Image Upload
    const file = formData.get('file') as File
    let image = ''
    if (file && file.size > 0) {
        try {
            image = await uploadFile(formData)
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                console.error("Upload failed", e)
            }
        }
    }

    // Prepare update object with proper typing
    const updateData: {
        first_name: string
        last_name: string
        category: string
        birth_year: string
        belt: string
        image?: string
    } = {
        first_name: firstName,
        last_name: lastName,
        category,
        birth_year: ageGroup,
        belt: rank,
    }

    if (image) {
        updateData.image = image
    }

    const { error } = await supabase
        .from('competitors')
        .update(updateData)
        .eq('id', id)

    if (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error updating competitor:", error.message)
        }
        return
    }

    revalidatePath('/takmicari')
    revalidatePath('/admin/competitors')
    redirect('/admin/competitors')
}

/**
 * Deletes a competitor (admin only)
 */
export async function deleteCompetitor(id: string): Promise<void> {
    await verifySession()

    // Validate UUID format
    if (!isValidUUID(id)) {
        console.error('Invalid competitor ID format')
        return
    }

    const { error } = await supabase.from('competitors').delete().eq('id', id)

    if (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error deleting competitor:", error.message)
        }
        return
    }

    revalidatePath('/takmicari')
    revalidatePath('/admin/competitors')
}

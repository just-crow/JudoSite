'use server'

import { supabase } from '@/lib/supabase'
import { verifySession } from './auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile } from './file-upload'
import {
    isValidUUID,
    validateSponsorInput,
    sanitizeString,
    isValidURL
} from '@/lib/validation'
import { unstable_cache } from 'next/cache'

export interface Sponsor {
    id: string
    name: string
    logo: string
    website: string
}

// Supabase row type
interface SponsorRow {
    id: string
    name: string
    logo: string | null
    website: string | null
    partner_type: string | null
}

/**
 * Maps a database row to Sponsor interface
 */
function mapRowToSponsor(row: SponsorRow): Sponsor {
    return {
        id: row.id,
        name: row.name,
        logo: row.logo || '',
        website: row.website || ''
    }
}

/**
 * Gets all sponsors with caching
 */
export const getSponsors = unstable_cache(
    async (): Promise<Sponsor[]> => {
        const { data, error } = await supabase
            .from('sponsors')
            .select('*')
            .order('created_at', { ascending: false })

        if (error || !data) {
            if (process.env.NODE_ENV === 'development' && error) {
                console.error("Error fetching sponsors:", error.message)
            }
            return []
        }

        return (data as SponsorRow[]).map(mapRowToSponsor)
    },
    ['sponsors'],
    { revalidate: 300, tags: ['sponsors'] }
)

/**
 * Creates a new sponsor (admin only)
 */
export async function createSponsor(formData: FormData): Promise<void> {
    await verifySession()

    const name = sanitizeString(formData.get('name') as string || '')
    const website = (formData.get('website') as string || '').trim()

    // Validate input
    const validation = validateSponsorInput({ name, website })
    if (!validation.valid) {
        console.error('Validation failed:', validation.error)
        return
    }

    // Additional URL validation
    if (website && !isValidURL(website)) {
        console.error('Invalid URL format')
        return
    }

    // Image Upload
    let logo = ''
    const file = formData.get('file') as File
    if (file && file.size > 0) {
        try {
            logo = await uploadFile(formData)
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                console.error("Upload failed", e)
            }
        }
    }

    const newItem = {
        name,
        website: website || null,
        logo: logo || null,
        partner_type: 'gold'
    }

    const { error } = await supabase.from('sponsors').insert(newItem)

    if (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error creating sponsor:", error.message)
        }
        return
    }

    revalidatePath('/')
    revalidatePath('/klub/sponzori')
    revalidatePath('/admin/sponsors')
    redirect('/admin/sponsors')
}

/**
 * Gets a single sponsor by ID
 */
export async function getSponsor(id: string): Promise<Sponsor | undefined> {
    // Validate UUID format
    if (!isValidUUID(id)) {
        return undefined
    }

    const { data, error } = await supabase
        .from('sponsors')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !data) return undefined

    return mapRowToSponsor(data as SponsorRow)
}

/**
 * Updates an existing sponsor (admin only)
 */
export async function updateSponsor(id: string, formData: FormData): Promise<void> {
    await verifySession()

    // Validate UUID format
    if (!isValidUUID(id)) {
        console.error('Invalid sponsor ID format')
        return
    }

    const name = sanitizeString(formData.get('name') as string || '')
    const website = (formData.get('website') as string || '').trim()

    // Validate input
    const validation = validateSponsorInput({ name, website })
    if (!validation.valid) {
        console.error('Validation failed:', validation.error)
        return
    }

    // Image Upload
    const file = formData.get('file') as File
    let logo = ''
    if (file && file.size > 0) {
        try {
            logo = await uploadFile(formData)
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                console.error("Upload failed", e)
            }
        }
    }

    const updateData: { name: string; website: string | null; logo?: string } = {
        name,
        website: website || null
    }
    if (logo) updateData.logo = logo

    const { error } = await supabase
        .from('sponsors')
        .update(updateData)
        .eq('id', id)

    if (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error updating sponsor:", error.message)
        }
        return
    }

    revalidatePath('/')
    revalidatePath('/klub/sponzori')
    revalidatePath('/admin/sponsors')
    redirect('/admin/sponsors')
}

/**
 * Deletes a sponsor (admin only)
 */
export async function deleteSponsor(id: string): Promise<void> {
    await verifySession()

    // Validate UUID format
    if (!isValidUUID(id)) {
        console.error('Invalid sponsor ID format')
        return
    }

    const { error } = await supabase.from('sponsors').delete().eq('id', id)

    if (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error deleting sponsor:", error.message)
        }
        return
    }

    revalidatePath('/klub/sponzori')
    revalidatePath('/admin/sponsors')
}

'use server'

import { supabase } from '@/lib/supabase'
import { verifySession } from './auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile } from './file-upload'
import {
    isValidUUID,
    validateTrainerInput,
    sanitizeString
} from '@/lib/validation'
import { unstable_cache } from 'next/cache'

export interface Trainer {
    id: string
    name: string
    role: string
    rank: string
    image: string
    phone: string
}

// Supabase row type
interface TrainerRow {
    id: string
    first_name: string
    last_name: string
    role: string | null
    rank: string | null
    image: string | null
    phone: string | null
}

/**
 * Maps a database row to Trainer interface
 */
function mapRowToTrainer(row: TrainerRow): Trainer {
    return {
        id: row.id,
        name: `${row.first_name} ${row.last_name}`.trim(),
        role: row.role || '',
        rank: row.rank || '',
        image: row.image || '',
        phone: row.phone || ''
    }
}

/**
 * Gets all trainers with caching
 */
export const getTrainers = unstable_cache(
    async (): Promise<Trainer[]> => {
        const { data, error } = await supabase
            .from('trainers')
            .select('*')
            .order('created_at', { ascending: false })

        if (error || !data) {
            if (process.env.NODE_ENV === 'development' && error) {
                console.error("Error fetching trainers:", error.message)
            }
            return []
        }

        return (data as TrainerRow[]).map(mapRowToTrainer)
    },
    ['trainers'],
    { revalidate: 300, tags: ['trainers'] }
)

/**
 * Creates a new trainer (admin only)
 */
export async function createTrainer(formData: FormData): Promise<void> {
    await verifySession()

    const name = sanitizeString(formData.get('name') as string || '')
    const role = sanitizeString(formData.get('role') as string || '')
    const rank = sanitizeString(formData.get('rank') as string || '')
    const phone = sanitizeString(formData.get('phone') as string || '')

    // Validate input
    const validation = validateTrainerInput({ name, role })
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
        role,
        rank,
        phone,
        image
    }

    const { error } = await supabase.from('trainers').insert(newItem)

    if (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error creating trainer:", error.message)
        }
        return
    }

    revalidatePath('/treneri')
    revalidatePath('/admin/trainers')
    redirect('/admin/trainers')
}

/**
 * Gets a single trainer by ID
 */
export async function getTrainer(id: string): Promise<Trainer | undefined> {
    // Validate UUID format
    if (!isValidUUID(id)) {
        return undefined
    }

    const { data, error } = await supabase
        .from('trainers')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !data) return undefined

    return mapRowToTrainer(data as TrainerRow)
}

/**
 * Updates an existing trainer (admin only)
 */
export async function updateTrainer(id: string, formData: FormData): Promise<void> {
    await verifySession()

    // Validate UUID format
    if (!isValidUUID(id)) {
        console.error('Invalid trainer ID format')
        return
    }

    const name = sanitizeString(formData.get('name') as string || '')
    const role = sanitizeString(formData.get('role') as string || '')
    const rank = sanitizeString(formData.get('rank') as string || '')
    const phone = sanitizeString(formData.get('phone') as string || '')

    // Validate input
    const validation = validateTrainerInput({ name, role })
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

    const updateData: {
        first_name: string
        last_name: string
        role: string
        rank: string
        phone: string
        image?: string
    } = {
        first_name: firstName,
        last_name: lastName,
        role,
        rank,
        phone
    }

    if (image) {
        updateData.image = image
    }

    const { error } = await supabase
        .from('trainers')
        .update(updateData)
        .eq('id', id)

    if (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error updating trainer:", error.message)
        }
        return
    }

    revalidatePath('/treneri')
    revalidatePath('/admin/trainers')
    redirect('/admin/trainers')
}

/**
 * Deletes a trainer (admin only)
 */
export async function deleteTrainer(id: string): Promise<void> {
    await verifySession()

    // Validate UUID format
    if (!isValidUUID(id)) {
        console.error('Invalid trainer ID format')
        return
    }

    const { error } = await supabase.from('trainers').delete().eq('id', id)

    if (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error deleting trainer:", error.message)
        }
        return
    }

    revalidatePath('/treneri')
    revalidatePath('/admin/trainers')
}

'use server'

import { supabase } from '@/lib/supabase'
import { verifySession } from './auth'
import { revalidatePath, unstable_cache } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile } from './file-upload'
import { validateTrainerInput, sanitizeString, validateUUID } from '@/lib/validation'

export interface Trainer {
    id: string
    name: string
    role: string
    rank: string
    image: string
    phone: string
}

const fetchTrainers = async (): Promise<Trainer[]> => {
    const { data, error } = await supabase
        .from('trainers')
        .select('*')
        .order('created_at', { ascending: false })

    if (error || !data) {
        console.error('Error fetching trainers:', error)
        return []
    }

    return data.map((item: any) => ({
        id: item.id,
        name: `${item.first_name} ${item.last_name}`,
        role: item.role,
        rank: item.rank,
        image: item.image,
        phone: item.phone
    }))
}

export const getTrainers = unstable_cache(
    async () => fetchTrainers(),
    ['trainers'],
    { revalidate: 300, tags: ['trainers'] }
)

export async function createTrainer(formData: FormData): Promise<void> {
    await verifySession()

    const name = sanitizeString(formData.get('name') as string || '')
    const role = sanitizeString(formData.get('role') as string || '')
    const rank = sanitizeString(formData.get('rank') as string || '')
    const phone = sanitizeString(formData.get('phone') as string || '')

    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ') || ''

    const validation = validateTrainerInput({ firstName, lastName, role, rank })
    if (!validation.valid) {
        console.error('Validation failed:', validation.error)
        return
    }

    let image = ''
    const file = formData.get('file') as File
    if (file && file.size > 0) {
        try {
            image = await uploadFile(formData)
        } catch (e) {
            console.error("Upload failed", e)
        }
    }

    const newItem = {
        first_name: firstName,
        last_name: lastName,
        role, rank, phone, image
    }

    const { error } = await supabase.from('trainers').insert(newItem)

    if (error) {
        console.error("Error creating trainer", error)
        return
    }

    revalidatePath('/treneri')
    revalidatePath('/admin/trainers')
    redirect('/admin/trainers')
}

export async function updateTrainer(id: string, formData: FormData): Promise<void> {
    await verifySession()

    if (!validateUUID(id)) return

    const name = sanitizeString(formData.get('name') as string || '')
    const role = sanitizeString(formData.get('role') as string || '')
    const rank = sanitizeString(formData.get('rank') as string || '')
    const phone = sanitizeString(formData.get('phone') as string || '')

    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ') || ''

    const validation = validateTrainerInput({ firstName, lastName, role, rank })
    if (!validation.valid) {
        console.error('Validation failed:', validation.error)
        return
    }

    let image = formData.get('existingImage') as string
    const file = formData.get('file') as File
    if (file && file.size > 0) {
        try {
            image = await uploadFile(formData)
        } catch (e) {
            console.error("Upload failed", e)
        }
    }

    const updatedItem = {
        first_name: firstName,
        last_name: lastName,
        role, rank, phone, image
    }

    const { error } = await supabase.from('trainers').update(updatedItem).eq('id', id)

    if (error) {
        console.error("Error updating trainer", error)
        return
    }

    revalidatePath('/treneri')
    revalidatePath('/admin/trainers')
    redirect('/admin/trainers')
}

export async function deleteTrainer(id: string): Promise<void> {
    await verifySession()
    if (!validateUUID(id)) return

    const { error } = await supabase.from('trainers').delete().eq('id', id)
    if (error) console.error("Error deleting trainer", error)

    revalidatePath('/treneri')
    revalidatePath('/admin/trainers')
}

export async function getTrainer(id: string) {
    if (!validateUUID(id)) return undefined

    const { data, error } = await supabase
        .from('trainers')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !data) return undefined

    return {
        id: data.id,
        name: `${data.first_name} ${data.last_name}`,
        role: data.role,
        rank: data.rank,
        image: data.image,
        phone: data.phone
    }
}

'use server'

import { supabase } from '@/lib/supabase'
import { verifySession } from './auth'
import { revalidatePath, unstable_cache } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile } from './file-upload'
import { validateCompetitorInput, sanitizeString, validateUUID } from '@/lib/validation'

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

const fetchCompetitors = async (): Promise<Competitor[]> => {
    const { data, error } = await supabase
        .from('competitors')
        .select('*')
        .order('created_at', { ascending: false })

    if (error || !data) {
        console.error('Error fetching competitors:', error)
        return []
    }

    return data.map((item: any) => ({
        id: item.id,
        name: `${item.first_name} ${item.last_name}`,
        category: item.category || '',
        ageGroup: item.birth_year || '', // assuming DB field is birth_year, mapping to ageGroup per existing code
        rank: item.belt || '',
        description: '',
        image: item.image || '',
        achievements: item.results ? item.results.split('\n') : []
    }))
}

export const getCompetitors = unstable_cache(
    async () => fetchCompetitors(),
    ['competitors'],
    { revalidate: 300, tags: ['competitors'] }
)

export async function createCompetitor(formData: FormData): Promise<void> {
    await verifySession()

    const name = sanitizeString(formData.get('name') as string || '')
    const category = sanitizeString(formData.get('category') as string || '')
    const ageGroup = sanitizeString(formData.get('ageGroup') as string || '') // birthDate in validation? existing code used birth_year/ageGroup
    const rank = sanitizeString(formData.get('rank') as string || '')
    // description unused in map but passed in form? 

    // Split name
    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ') || ''

    const validation = validateCompetitorInput({ firstName, lastName, ageGroup, category, rank })
    if (!validation.valid) {
        console.error('Validation failed:', validation.error)
        // Ideally return errors to UI, but void return requested.
        return
    }

    // Image Upload
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
        category,
        birth_year: ageGroup,
        belt: rank,
        image,
        results: ''
    }

    const { error } = await supabase.from('competitors').insert(newItem)

    if (error) {
        console.error("Error creating competitor", error)
        return
    }

    revalidatePath('/takmicari')
    revalidatePath('/admin/competitors')
    redirect('/admin/competitors')
}

export async function deleteCompetitor(id: string): Promise<void> {
    await verifySession()

    if (!validateUUID(id)) {
        console.error('Invalid ID')
        return
    }

    const { error } = await supabase.from('competitors').delete().eq('id', id)

    if (error) {
        console.error("Error deleting competitor", error)
        return
    }

    revalidatePath('/takmicari')
    revalidatePath('/admin/competitors')
}

export async function updateCompetitor(id: string, formData: FormData): Promise<void> {
    await verifySession()

    if (!validateUUID(id)) {
        console.error('Invalid ID')
        return
    }

    const name = sanitizeString(formData.get('name') as string || '')
    const category = sanitizeString(formData.get('category') as string || '')
    const ageGroup = sanitizeString(formData.get('ageGroup') as string || '')
    const rank = sanitizeString(formData.get('rank') as string || '')

    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ') || ''

    const validation = validateCompetitorInput({ firstName, lastName, ageGroup, category, rank })
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
        category,
        birth_year: ageGroup,
        belt: rank,
        image
    }

    const { error } = await supabase.from('competitors').update(updatedItem).eq('id', id)

    if (error) {
        console.error("Error updating competitor", error)
        return
    }

    revalidatePath('/takmicari')
    revalidatePath('/admin/competitors')
    redirect('/admin/competitors')
}

export async function getCompetitor(id: string) {
    if (!validateUUID(id)) return undefined

    const { data, error } = await supabase
        .from('competitors')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !data) return undefined

    return {
        id: data.id,
        name: `${data.first_name} ${data.last_name}`,
        category: data.category || '',
        ageGroup: data.birth_year || '',
        rank: data.belt || '',
        image: data.image || '',
        description: '', // filler per existing code
        achievements: data.results ? data.results.split('\n') : []
    }
}

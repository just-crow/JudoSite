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

    const mapped = data.map((item: any) => ({
        id: item.id,
        name: `${item.first_name} ${item.last_name}`,
        category: item.category || '',
        ageGroup: item.birth_year || '',
        rank: item.belt || '',
        description: '',
        image: item.image || '',
        achievements: item.results ? item.results.split('\n') : [],
        _birthYearRaw: item.birth_year || ''
    }))

    const ageGroupOrder: Record<string, number> = {
        'Seniori': 0, 'Mlađi seniori': 1, 'Juniori': 2, 'Kadeti': 3,
        'U-18': 4, 'U-16': 5, 'U-15': 6, 'U-14': 7, 'U-13': 8, 'U-12': 9,
        'U-11': 10, 'U-10': 11, 'Picini': 12
    }

    function getAgeSortValue(raw: string): number {
        if (ageGroupOrder[raw] !== undefined) return ageGroupOrder[raw]
        if (raw.startsWith('U-')) {
            const n = parseInt(raw.slice(2), 10)
            return isNaN(n) ? -1 : (20 - n)
        }
        const year = parseInt(raw, 10)
        if (!isNaN(year) && year > 1900 && year < 2030) return 2030 - year
        return -1
    }

    function extractWeight(cat: string): number {
        const match = cat.match(/(\d+)/)
        return match ? parseInt(match[1], 10) : 0
    }

    mapped.sort((a, b) => {
        const ageA = getAgeSortValue(a._birthYearRaw)
        const ageB = getAgeSortValue(b._birthYearRaw)
        if (ageA !== ageB) return ageA - ageB
        return extractWeight(b.category) - extractWeight(a.category)
    })

    mapped.forEach(item => { delete (item as any)._birthYearRaw })

    return mapped
}

export const getCompetitors = unstable_cache(
    async () => fetchCompetitors(),
    ['competitors-v3'],
    { revalidate: 300, tags: ['competitors-v3'] }
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

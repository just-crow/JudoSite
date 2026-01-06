'use server'

import { supabase } from '@/lib/supabase'
import { verifySession } from './auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile } from './file-upload'

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

export async function getCompetitors(): Promise<Competitor[]> {
    const { data, error } = await supabase
        .from('competitors')
        .select('*')
        .order('created_at', { ascending: false })

    if (error || !data) return []

    return data.map((item: any) => ({
        id: item.id,
        name: `${item.first_name} ${item.last_name}`,
        category: item.category || '',
        ageGroup: item.birth_year || '',
        rank: item.belt || '',
        description: '', // description might not be in DB schema, defaulting empty
        image: item.image || '',
        achievements: item.results ? item.results.split('\n') : []
    }))
}

export async function createCompetitor(formData: FormData) {
    await verifySession()

    const name = formData.get('name') as string
    const category = formData.get('category') as string
    const ageGroup = formData.get('ageGroup') as string
    const rank = formData.get('rank') as string
    const description = formData.get('description') as string

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
        results: '' // achievements not passed in form, usually added later or need field
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

export async function getCompetitor(id: string) {
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
        description: '',
        image: data.image || '',
        achievements: data.results ? data.results.split('\n') : []
    }
}

export async function updateCompetitor(id: string, formData: FormData) {
    await verifySession()

    const name = formData.get('name') as string
    const category = formData.get('category') as string
    const ageGroup = formData.get('ageGroup') as string
    const rank = formData.get('rank') as string
    const description = formData.get('description') as string

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
            console.error("Upload failed", e)
        }
    }

    // Prepare update object
    const updateData: any = {
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
        console.error("Error updating competitor", error)
        return
    }

    revalidatePath('/takmicari')
    revalidatePath('/admin/competitors')
    redirect('/admin/competitors')
}

export async function deleteCompetitor(id: string) {
    await verifySession()

    await supabase.from('competitors').delete().eq('id', id)

    revalidatePath('/takmicari')
    revalidatePath('/admin/competitors')
}

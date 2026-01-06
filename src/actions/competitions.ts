'use server'

import { supabase } from '@/lib/supabase'
import { verifySession } from './auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export interface Competition {
    id: string
    title: string
    date: string
    location: string
    description: string
    registrationLink: string
}

export async function getCompetitions(): Promise<Competition[]> {
    const { data, error } = await supabase
        .from('competitions')
        .select('*')
        .order('created_at', { ascending: false })

    if (error || !data) return []

    return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        date: item.date,
        location: item.location,
        description: item.description,
        registrationLink: item.application_link || ''
    }))
}

export async function createCompetition(formData: FormData) {
    await verifySession()

    const title = formData.get('title') as string
    const date = formData.get('date') as string
    const location = formData.get('location') as string
    const description = formData.get('description') as string
    const registrationLink = formData.get('registrationLink') as string

    const newItem = {
        title,
        date,
        location,
        description,
        application_link: registrationLink
    }

    const { error } = await supabase.from('competitions').insert(newItem)

    if (error) {
        console.error("Error creating competition", error)
        return
    }

    revalidatePath('/')
    revalidatePath('/admin/competitions')
    redirect('/admin/competitions')
}

export async function getCompetition(id: string) {
    const { data, error } = await supabase
        .from('competitions')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !data) return null

    return {
        id: data.id,
        title: data.title,
        date: data.date,
        location: data.location,
        description: data.description,
        registrationLink: data.application_link || ''
    }
}

export async function updateCompetition(id: string, formData: FormData) {
    await verifySession()

    const title = formData.get('title') as string
    const date = formData.get('date') as string
    const location = formData.get('location') as string
    const description = formData.get('description') as string
    const registrationLink = formData.get('registrationLink') as string

    const { error } = await supabase
        .from('competitions')
        .update({
            title,
            date,
            location,
            description,
            application_link: registrationLink
        })
        .eq('id', id)

    if (error) {
        console.error("Error updating competition", error)
        return
    }

    revalidatePath('/')
    revalidatePath('/admin/competitions')
    redirect('/admin/competitions')
}

export async function deleteCompetition(id: string) {
    await verifySession()

    await supabase.from('competitions').delete().eq('id', id)

    revalidatePath('/admin/competitions')
}

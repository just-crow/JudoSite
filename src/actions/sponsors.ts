'use server'

import { supabase } from '@/lib/supabase'
import { verifySession } from './auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile } from './file-upload'

export interface Sponsor {
    id: string
    name: string
    logo: string
    website: string
}

export async function getSponsors(): Promise<Sponsor[]> {
    const { data, error } = await supabase
        .from('sponsors')
        .select('*')
        .order('created_at', { ascending: false })

    if (error || !data) return []

    return data.map((item: any) => ({
        id: item.id,
        name: item.name,
        logo: item.logo,
        website: item.website
    }))
}

export async function createSponsor(formData: FormData) {
    await verifySession()

    const name = formData.get('name') as string
    const website = formData.get('website') as string

    // Image Upload
    let logo = ''
    const file = formData.get('file') as File
    if (file && file.size > 0) {
        try {
            logo = await uploadFile(formData)
        } catch (e) {
            console.error("Upload failed", e)
        }
    }

    const newItem = {
        name, website, logo, partner_type: 'gold' // Default or add field
    }

    const { error } = await supabase.from('sponsors').insert(newItem)

    if (error) {
        console.error("Error creating sponsor", error)
        return
    }

    revalidatePath('/')
    revalidatePath('/admin/sponsors')
    redirect('/admin/sponsors')
}

export async function getSponsor(id: string) {
    const { data, error } = await supabase
        .from('sponsors')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !data) return undefined

    return {
        id: data.id,
        name: data.name,
        logo: data.logo,
        website: data.website
    }
}

export async function updateSponsor(id: string, formData: FormData) {
    await verifySession()

    const name = formData.get('name') as string
    const website = formData.get('website') as string

    // Image Upload
    const file = formData.get('file') as File
    let logo = ''
    if (file && file.size > 0) {
        try {
            logo = await uploadFile(formData)
        } catch (e) {
            console.error("Upload failed", e)
        }
    }

    const updateData: any = { name, website }
    if (logo) updateData.logo = logo

    const { error } = await supabase
        .from('sponsors')
        .update(updateData)
        .eq('id', id)

    if (error) {
        console.error("Error updating sponsor", error)
        return
    }

    revalidatePath('/')
    revalidatePath('/admin/sponsors')
    redirect('/admin/sponsors')
}

export async function deleteSponsor(id: string) {
    await verifySession()

    await supabase.from('sponsors').delete().eq('id', id)

    revalidatePath('/admin/sponsors')
}

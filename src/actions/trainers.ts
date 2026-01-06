'use server'

import { supabase } from '@/lib/supabase'
import { verifySession } from './auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile } from './file-upload'

export interface Trainer {
    id: string
    name: string
    role: string
    rank: string
    image: string
    bio: string
    email: string
    phone: string
}

export async function getTrainers(): Promise<Trainer[]> {
    const { data, error } = await supabase
        .from('trainers')
        .select('*')
        .order('created_at', { ascending: false })

    if (error || !data) return []

    return data.map((item: any) => ({
        id: item.id,
        name: `${item.first_name} ${item.last_name}`,
        role: item.role,
        rank: item.rank,
        image: item.image,
        bio: item.bio,
        email: item.email,
        phone: item.phone
    }))
}

export async function createTrainer(formData: FormData) {
    await verifySession()

    const name = formData.get('name') as string
    const role = formData.get('role') as string
    const rank = formData.get('rank') as string
    const bio = formData.get('bio') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string

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
        role, rank, bio, email, phone, image
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

export async function getTrainer(id: string) {
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
        bio: data.bio,
        email: data.email,
        phone: data.phone
    }
}

export async function updateTrainer(id: string, formData: FormData) {
    await verifySession()

    const name = formData.get('name') as string
    const role = formData.get('role') as string
    const rank = formData.get('rank') as string
    const bio = formData.get('bio') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string

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

    const updateData: any = {
        first_name: firstName,
        last_name: lastName,
        role, rank, bio, email, phone
    }

    if (image) {
        updateData.image = image
    }

    const { error } = await supabase
        .from('trainers')
        .update(updateData)
        .eq('id', id)

    if (error) {
        console.error("Error updating trainer", error)
        return
    }

    revalidatePath('/treneri')
    revalidatePath('/admin/trainers')
    redirect('/admin/trainers')
}

export async function deleteTrainer(id: string) {
    await verifySession()

    await supabase.from('trainers').delete().eq('id', id)

    revalidatePath('/treneri')
    revalidatePath('/admin/trainers')
}

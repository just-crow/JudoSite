'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { verifySession } from './auth'

export interface ContactMessage {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    subject: string
    message: string
    createdAt: string
    read: boolean
}

export async function getMessages(): Promise<ContactMessage[]> {
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })

    if (error || !data) return []

    return data.map((item: any) => ({
        id: item.id,
        firstName: item.first_name,
        lastName: item.last_name,
        email: item.email,
        phone: item.phone,
        subject: item.subject,
        message: item.message,
        createdAt: item.created_at,
        read: item.read
    }))
}

export async function sendMessage(formData: FormData) {
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string

    if (!firstName || !email || !message) {
        return { success: false, error: 'Molimo ispunite obavezna polja.' }
    }

    const newItem = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        subject,
        message,
        read: false
    }

    const { error } = await supabase.from('messages').insert(newItem)

    if (error) {
        console.error("Error sending message", error)
        return { success: false, error: 'Greška pri slanju poruke.' }
    }

    return { success: true }
}

export async function deleteMessage(id: string) {
    await verifySession()

    await supabase.from('messages').delete().eq('id', id)

    revalidatePath('/admin/messages')
    redirect('/admin/messages')
}

export async function markAsRead(id: string) {
    await verifySession()

    await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', id)

    revalidatePath('/admin/messages')
}

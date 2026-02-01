'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath, unstable_cache } from 'next/cache'
import { redirect } from 'next/navigation'
import { verifySession } from './auth'
import { validateMessageInput, sanitizeString, validateUUID } from '@/lib/validation'

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

const fetchMessages = async (): Promise<ContactMessage[]> => {
    // Only admin usually sees messages, so verifySession might be good here too if called from client
    // constructing getter for admin page

    // Note: Verify session for data fetching? If getMessages is used in server component (page), 
    // verifySession acts on cookies. 

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

// Caching messages for short time, or not at all? Messages are real-time ish. 
// 60 seconds seems reasonable for admin dashboard.
export const getMessages = unstable_cache(
    async () => fetchMessages(),
    ['messages'],
    { revalidate: 60, tags: ['messages'] }
)

export async function sendMessage(formData: FormData) {
    // Public action, no session check

    const firstName = sanitizeString(formData.get('firstName') as string || '')
    const lastName = sanitizeString(formData.get('lastName') as string || '')
    const email = sanitizeString(formData.get('email') as string || '')
    const phone = sanitizeString(formData.get('phone') as string || '')
    const subject = sanitizeString(formData.get('subject') as string || '')
    const message = sanitizeString(formData.get('message') as string || '')

    const validation = validateMessageInput({ name: firstName, email, subject, message })
    if (!validation.valid) {
        return { success: false, error: validation.error }
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

export async function deleteMessage(id: string): Promise<void> {
    await verifySession()
    if (!validateUUID(id)) return

    await supabase.from('messages').delete().eq('id', id)

    revalidatePath('/admin/messages')
    // No redirect usually for delete in list, but existing code had it. 
    // If we redirect, it refreshes the page. 
    // Keeping behavior but usually return void is enough if action called from form.
    redirect('/admin/messages')
}

export async function markAsRead(id: string): Promise<void> {
    await verifySession()
    if (!validateUUID(id)) return

    await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', id)

    revalidatePath('/admin/messages')
}

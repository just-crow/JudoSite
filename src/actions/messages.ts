'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { verifySession } from './auth'
import {
    isValidUUID,
    sanitizeString,
    isValidEmail
} from '@/lib/validation'
import { unstable_cache } from 'next/cache'

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

// Supabase row type
interface MessageRow {
    id: string
    first_name: string
    last_name: string | null
    email: string
    phone: string | null
    subject: string | null
    message: string
    created_at: string
    read: boolean
}

/**
 * Maps a database row to ContactMessage interface
 */
function mapRowToMessage(row: MessageRow): ContactMessage {
    return {
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name || '',
        email: row.email,
        phone: row.phone || '',
        subject: row.subject || '',
        message: row.message,
        createdAt: row.created_at,
        read: row.read || false
    }
}

/**
 * Gets all messages (admin only, with caching)
 */
export const getMessages = unstable_cache(
    async (): Promise<ContactMessage[]> => {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .order('created_at', { ascending: false })

        if (error || !data) {
            if (process.env.NODE_ENV === 'development' && error) {
                console.error("Error fetching messages:", error.message)
            }
            return []
        }

        return (data as MessageRow[]).map(mapRowToMessage)
    },
    ['messages'],
    { revalidate: 60, tags: ['messages'] } // Shorter cache for messages
)

/**
 * Sends a contact message (public endpoint - requires validation)
 */
export async function sendMessage(formData: FormData): Promise<{ success: boolean; error?: string }> {
    const firstName = sanitizeString(formData.get('firstName') as string || '')
    const lastName = sanitizeString(formData.get('lastName') as string || '')
    const email = (formData.get('email') as string || '').trim().toLowerCase()
    const phone = sanitizeString(formData.get('phone') as string || '')
    const subject = sanitizeString(formData.get('subject') as string || '')
    const message = sanitizeString(formData.get('message') as string || '')

    // Validate required fields
    if (!firstName || firstName.length < 2) {
        return { success: false, error: 'Ime mora imati najmanje 2 karaktera' }
    }

    if (!email || !isValidEmail(email)) {
        return { success: false, error: 'Neispravan email format' }
    }

    if (!message || message.length < 10) {
        return { success: false, error: 'Poruka mora imati najmanje 10 karaktera' }
    }

    if (message.length > 5000) {
        return { success: false, error: 'Poruka ne smije biti duža od 5000 karaktera' }
    }

    const newItem = {
        first_name: firstName,
        last_name: lastName || null,
        email,
        phone: phone || null,
        subject: subject || null,
        message,
        read: false
    }

    const { error } = await supabase.from('messages').insert(newItem)

    if (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error sending message:", error.message)
        }
        return { success: false, error: 'Greška pri slanju poruke' }
    }

    return { success: true }
}

/**
 * Deletes a message (admin only)
 */
export async function deleteMessage(id: string): Promise<void> {
    await verifySession()

    // Validate UUID format
    if (!isValidUUID(id)) {
        console.error('Invalid message ID format')
        return
    }

    const { error } = await supabase.from('messages').delete().eq('id', id)

    if (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error deleting message:", error.message)
        }
        return
    }

    revalidatePath('/admin/messages')
    redirect('/admin/messages')
}

/**
 * Marks a message as read (admin only)
 */
export async function markAsRead(id: string): Promise<void> {
    await verifySession()

    // Validate UUID format
    if (!isValidUUID(id)) {
        console.error('Invalid message ID format')
        return
    }

    const { error } = await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', id)

    if (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error marking message as read:", error.message)
        }
        return
    }

    revalidatePath('/admin/messages')
}

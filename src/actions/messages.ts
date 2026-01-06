'use server'

import fs from 'fs/promises'
import path from 'path'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { verifySession } from './auth'

const DATA_FILE = path.join(process.cwd(), 'src/data/messages.json')

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
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

export async function sendMessage(formData: FormData) {
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string

    if (!firstName || !email || !message) {
        // Basic validation
        return { success: false, error: 'Molimo ispunite obavezna polja.' }
    }

    const newMessage: ContactMessage = {
        id: Date.now().toString(),
        firstName,
        lastName,
        email,
        phone,
        subject,
        message,
        createdAt: new Date().toISOString(),
        read: false
    }

    const messages = await getMessages()
    messages.unshift(newMessage)

    await fs.writeFile(DATA_FILE, JSON.stringify(messages, null, 2))

    // In a real app we might send an email here too

    // Return success to update UI
    return { success: true }
}

export async function deleteMessage(id: string) {
    await verifySession()
    const messages = await getMessages()
    const filtered = messages.filter(m => m.id !== id)

    await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2))
    revalidatePath('/admin/messages')
    redirect('/admin/messages')
}

export async function markAsRead(id: string) {
    await verifySession()
    const messages = await getMessages()
    const index = messages.findIndex(m => m.id === id)

    if (index !== -1) {
        messages[index].read = true
        await fs.writeFile(DATA_FILE, JSON.stringify(messages, null, 2))
        revalidatePath('/admin/messages')
    }
}

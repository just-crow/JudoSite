'use server'

import fs from 'fs/promises'
import path from 'path'
import { verifySession } from './auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile } from './file-upload'

const DATA_FILE = path.join(process.cwd(), 'src/data/trainers.json')

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
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

export async function createTrainer(formData: FormData) {
    await verifySession()

    const name = formData.get('name') as string
    const role = formData.get('role') as string
    const rank = formData.get('rank') as string
    const bio = formData.get('bio') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string

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

    const newItem: Trainer = {
        id: Date.now().toString(),
        name, role, rank, bio, email, phone, image
    }

    const items = await getTrainers()
    items.unshift(newItem)
    await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2))
    revalidatePath('/treneri')
    revalidatePath('/admin/trainers')
    redirect('/admin/trainers')
}

export async function getTrainer(id: string) {
    const items = await getTrainers()
    return items.find(i => i.id === id)
}

export async function updateTrainer(id: string, formData: FormData) {
    await verifySession()

    const name = formData.get('name') as string
    const role = formData.get('role') as string
    const rank = formData.get('rank') as string
    const bio = formData.get('bio') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string

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

    const items = await getTrainers()
    const index = items.findIndex(i => i.id === id)

    if (index !== -1) {
        if (!image) image = items[index].image

        items[index] = {
            ...items[index],
            name, role, rank, bio, email, phone, image
        }

        await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2))
        revalidatePath('/treneri')
        revalidatePath('/admin/trainers')
    }

    redirect('/admin/trainers')
}

export async function deleteTrainer(id: string) {
    await verifySession()
    const items = await getTrainers()
    const filtered = items.filter(i => i.id !== id)
    await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2))
    revalidatePath('/treneri')
    revalidatePath('/admin/trainers')
}

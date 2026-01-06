'use server'

import fs from 'fs/promises'
import path from 'path'
import { verifySession } from './auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile } from './file-upload'

const DATA_FILE = path.join(process.cwd(), 'src/data/sponsors.json')

export interface Sponsor {
    id: string
    name: string
    logo: string
    website: string
}

export async function getSponsors(): Promise<Sponsor[]> {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        return []
    }
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

    const newItem: Sponsor = {
        id: Date.now().toString(),
        name, website, logo
    }

    const items = await getSponsors()
    items.unshift(newItem)
    await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2))
    revalidatePath('/')
    revalidatePath('/admin/sponsors')
    redirect('/admin/sponsors')
}

export async function getSponsor(id: string) {
    const items = await getSponsors()
    return items.find(i => i.id === id)
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

    const items = await getSponsors()
    const index = items.findIndex(i => i.id === id)

    if (index !== -1) {
        if (!logo) logo = items[index].logo

        items[index] = {
            ...items[index],
            name, website, logo
        }

        await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2))
        revalidatePath('/')
        revalidatePath('/admin/sponsors')
    }

    redirect('/admin/sponsors')
}

export async function deleteSponsor(id: string) {
    await verifySession()
    const items = await getSponsors()
    const filtered = items.filter(i => i.id !== id)
    await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2))
    revalidatePath('/admin/sponsors')
}

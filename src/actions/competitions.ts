'use server'

import fs from 'fs/promises'
import path from 'path'
import { verifySession } from './auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const DATA_FILE = path.join(process.cwd(), 'src/data/competitions.json')

export interface Competition {
    id: string
    title: string
    date: string
    location: string
    description: string
    registrationLink: string
}

export async function getCompetitions(): Promise<Competition[]> {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

export async function createCompetition(formData: FormData) {
    await verifySession()

    const title = formData.get('title') as string
    const date = formData.get('date') as string
    const location = formData.get('location') as string
    const description = formData.get('description') as string
    const registrationLink = formData.get('registrationLink') as string

    const newItem: Competition = {
        id: Date.now().toString(),
        title, date, location, description, registrationLink
    }

    const items = await getCompetitions()
    items.unshift(newItem)
    await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2))
    revalidatePath('/')
    revalidatePath('/admin/competitions')
    redirect('/admin/competitions')
}

export async function getCompetition(id: string) {
    const items = await getCompetitions()
    return items.find(i => i.id === id)
}

export async function updateCompetition(id: string, formData: FormData) {
    await verifySession()

    const title = formData.get('title') as string
    const date = formData.get('date') as string
    const location = formData.get('location') as string
    const description = formData.get('description') as string
    const registrationLink = formData.get('registrationLink') as string

    const items = await getCompetitions()
    const index = items.findIndex(i => i.id === id)

    if (index !== -1) {
        items[index] = {
            ...items[index],
            title, date, location, description, registrationLink
        }

        await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2))
        revalidatePath('/')
        revalidatePath('/admin/competitions')
    }

    redirect('/admin/competitions')
}

export async function deleteCompetition(id: string) {
    await verifySession()
    const items = await getCompetitions()
    const filtered = items.filter(i => i.id !== id)
    await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2))
    revalidatePath('/admin/competitions')
}

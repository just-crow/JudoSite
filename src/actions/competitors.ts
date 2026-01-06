'use server'

import fs from 'fs/promises'
import path from 'path'
import { verifySession } from './auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile } from './file-upload'

const DATA_FILE = path.join(process.cwd(), 'src/data/competitors.json')

export interface Competitor {
    id: string
    name: string
    category: string
    ageGroup: string
    rank: string
    image: string
    description: string
    achievements: string[]
}

export async function getCompetitors(): Promise<Competitor[]> {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

export async function createCompetitor(formData: FormData) {
    await verifySession()

    const name = formData.get('name') as string
    const category = formData.get('category') as string
    const ageGroup = formData.get('ageGroup') as string
    const rank = formData.get('rank') as string
    const description = formData.get('description') as string

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

    const newCompetitor: Competitor = {
        id: Date.now().toString(),
        name,
        category,
        ageGroup,
        rank,
        description,
        image,
        achievements: [] // Handle separate input if needed
    }

    const competitors = await getCompetitors()
    competitors.unshift(newCompetitor)
    await fs.writeFile(DATA_FILE, JSON.stringify(competitors, null, 2))
    revalidatePath('/takmicari')
    revalidatePath('/admin/competitors')
    redirect('/admin/competitors')
}

export async function getCompetitor(id: string) {
    const competitors = await getCompetitors()
    return competitors.find(c => c.id === id)
}

export async function updateCompetitor(id: string, formData: FormData) {
    await verifySession()

    const name = formData.get('name') as string
    const category = formData.get('category') as string
    const ageGroup = formData.get('ageGroup') as string
    const rank = formData.get('rank') as string
    const description = formData.get('description') as string

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

    const competitors = await getCompetitors()
    const index = competitors.findIndex(c => c.id === id)

    if (index !== -1) {
        // Keep old image if no new one uploaded
        if (!image) {
            image = competitors[index].image
        }

        competitors[index] = {
            ...competitors[index],
            name, category, ageGroup, rank, description, image
        }

        await fs.writeFile(DATA_FILE, JSON.stringify(competitors, null, 2))
        revalidatePath('/takmicari')
        revalidatePath('/admin/competitors')
    }

    redirect('/admin/competitors')
}

export async function deleteCompetitor(id: string) {
    await verifySession()
    const competitors = await getCompetitors()
    const filtered = competitors.filter(c => c.id !== id)
    await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2))
    revalidatePath('/takmicari')
    revalidatePath('/admin/competitors')
}

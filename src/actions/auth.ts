'use server'

import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'
import { redirect } from 'next/navigation'

const SECRET_KEY = process.env.SESSION_SECRET || 'super-secret-key-change-this'
const key = new TextEncoder().encode(SECRET_KEY)

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(key)
}

export async function decrypt(input: string): Promise<any> {
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        return null
    }
}

export async function login(formData: FormData) {
    const handle = formData.get('handle')
    const password = formData.get('password')

    if (handle === process.env.ADMIN_HANDLE && password === process.env.ADMIN_PASSWORD) {
        // Create the session
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day
        const session = await encrypt({ user: 'admin', expires })

        // Save the session in a cookie
        const cookieStore = await cookies()
        cookieStore.set('session', session, { expires, httpOnly: true, secure: true, sameSite: 'lax', path: '/' })

        redirect('/admin/dashboard')
    }

    // If login fails
    return { error: 'Pogrešno korisničko ime ili lozinka' }
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
    redirect('/admin')
}

export async function getSession() {
    const cookieStore = await cookies()
    const session = cookieStore.get('session')?.value
    if (!session) return null
    return await decrypt(session)
}

export async function verifySession() {
    const session = await getSession()
    if (!session?.user) {
        redirect('/admin')
    }
    return session
}

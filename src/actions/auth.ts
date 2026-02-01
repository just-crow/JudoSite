'use server'

import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'
import { redirect } from 'next/navigation'
import crypto from 'crypto'

function getSecretKey(): Uint8Array {
    const secretKey = process.env.SESSION_SECRET
    if (!secretKey) {
        if (process.env.NODE_ENV === 'production') {
            throw new Error('SESSION_SECRET must be set in production environment')
        }
        console.warn('Warning: Using default SESSION_SECRET. Set a strong secret in production!')
        return new TextEncoder().encode('super-secret-key-change-this')
    }
    return new TextEncoder().encode(secretKey)
}

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(getSecretKey()) // Use dynamic key
}

export async function decrypt(input: string): Promise<any> {
    try {
        const { payload } = await jwtVerify(input, getSecretKey(), {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        return null
    }
}

export async function login(formData: FormData) {
    const handle = formData.get('handle') as string
    const password = formData.get('password') as string

    // Timing-safe comparison
    const expectedHandle = process.env.ADMIN_HANDLE || ''
    const expectedPassword = process.env.ADMIN_PASSWORD || ''

    const isHandleValid = timingSafeEqual(handle, expectedHandle)
    const isPasswordValid = timingSafeEqual(password, expectedPassword)

    if (isHandleValid && isPasswordValid) {
        // Create the session
        const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        const session = await encrypt({ user: 'admin', expires })

        // Save the session in a cookie
        const cookieStore = await cookies()
        cookieStore.set('session', session, {
            expires,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        })

        redirect('/admin/dashboard')
    }

    // If login fails
    return { error: 'Pogrešno korisničko ime ili lozinka' }
}

function timingSafeEqual(a: string, b: string): boolean {
    const bufA = Buffer.from(a)
    const bufB = Buffer.from(b)
    if (bufA.length !== bufB.length) {
        // Always comparing to avoid timing leaks on length
        crypto.timingSafeEqual(bufA, bufA)
        return false
    }
    return crypto.timingSafeEqual(bufA, bufB)
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

    // Check expiration explicitly (casting to any because payload type is generic)
    const expires = new Date((session as any).expires)
    if (new Date() > expires) {
        await logout()
    }

    return session
}

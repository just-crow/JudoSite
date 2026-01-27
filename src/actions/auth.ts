'use server'

import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'
import { redirect } from 'next/navigation'

// Get secret key lazily to avoid build-time errors
function getSecretKey(): Uint8Array {
    const secretKey = process.env.SESSION_SECRET
    if (!secretKey || secretKey === 'super-secret-key-change-this') {
        if (process.env.NODE_ENV === 'production') {
            throw new Error('SESSION_SECRET must be set in production environment')
        }
        console.warn('Warning: Using default SESSION_SECRET. Set a strong secret in production!')
        return new TextEncoder().encode('dev-secret-change-in-production')
    }
    return new TextEncoder().encode(secretKey)
}

// Session payload type for type safety
interface SessionPayload {
    user: string;
    role: 'admin';
    expires: Date;
    iat?: number;
    exp?: number;
}

/**
 * Encrypts session payload into a JWT
 */
export async function encrypt(payload: Omit<SessionPayload, 'iat' | 'exp'>): Promise<string> {
    return await new SignJWT(payload as unknown as Record<string, unknown>)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(getSecretKey())
}

/**
 * Decrypts and validates a JWT session token
 */
export async function decrypt(input: string): Promise<SessionPayload | null> {
    try {
        const { payload } = await jwtVerify(input, getSecretKey(), {
            algorithms: ['HS256'],
        })

        // Validate payload structure
        if (typeof payload.user !== 'string' || payload.role !== 'admin') {
            return null
        }

        return payload as unknown as SessionPayload
    } catch {
        // Token invalid, expired, or tampered - return null without logging sensitive info
        return null
    }
}

/**
 * Timing-safe string comparison to prevent timing attacks
 */
function timingSafeEqual(a: string, b: string): boolean {
    if (a.length !== b.length) {
        return false
    }
    let result = 0
    for (let i = 0; i < a.length; i++) {
        result |= a.charCodeAt(i) ^ b.charCodeAt(i)
    }
    return result === 0
}

/**
 * Handles admin login authentication
 */
export async function login(formData: FormData): Promise<{ error: string } | void> {
    const handle = formData.get('handle')
    const password = formData.get('password')

    // Validate input types
    if (typeof handle !== 'string' || typeof password !== 'string') {
        return { error: 'Pogrešno korisničko ime ili lozinka' }
    }

    const adminHandle = process.env.ADMIN_HANDLE
    const adminPassword = process.env.ADMIN_PASSWORD

    // Ensure admin credentials are configured
    if (!adminHandle || !adminPassword) {
        if (process.env.NODE_ENV === 'development') {
            console.error('ADMIN_HANDLE and ADMIN_PASSWORD must be set')
        }
        return { error: 'Pogrešno korisničko ime ili lozinka' }
    }

    // Use timing-safe comparison to prevent timing attacks
    const handleMatch = timingSafeEqual(handle, adminHandle)
    const passwordMatch = timingSafeEqual(password, adminPassword)

    if (handleMatch && passwordMatch) {
        // Create the session with admin role
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day
        const session = await encrypt({
            user: 'admin',
            role: 'admin',
            expires
        })

        // Save the session in a secure cookie
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

    // Generic error message to prevent user enumeration
    return { error: 'Pogrešno korisničko ime ili lozinka' }
}

/**
 * Handles user logout
 */
export async function logout(): Promise<void> {
    const cookieStore = await cookies()
    cookieStore.delete('session')
    redirect('/admin')
}

/**
 * Retrieves and validates the current session
 */
export async function getSession(): Promise<SessionPayload | null> {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')?.value

    if (!sessionCookie) return null

    const session = await decrypt(sessionCookie)

    // Validate session hasn't expired (additional check beyond JWT exp)
    if (session && session.expires) {
        const expiryDate = new Date(session.expires)
        if (expiryDate < new Date()) {
            return null
        }
    }

    return session
}

/**
 * Verifies that the current user has admin access
 * Redirects to login page if not authenticated or not an admin
 */
export async function verifySession(): Promise<SessionPayload> {
    const session = await getSession()

    // Check both authentication and admin role
    if (!session?.user || session.role !== 'admin') {
        redirect('/admin')
    }

    return session
}

/**
 * Checks if the current user is authenticated as admin (non-redirecting)
 */
export async function isAdmin(): Promise<boolean> {
    const session = await getSession()
    return session?.role === 'admin'
}

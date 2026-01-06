'use client'

import { login } from '@/actions/auth'
import { useFormStatus } from 'react-dom'
import { useState } from 'react'

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className={`btn-primary w-full justify-center ${pending ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
            {pending ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Prijava...
                </>
            ) : (
                'Prijavi se'
            )}
        </button>
    )
}

export default function AdminLoginPage() {
    const [error, setError] = useState<string | null>(null)

    async function clientAction(formData: FormData) {
        const result = await login(formData)
        if (result?.error) {
            setError(result.error)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background-alt)] px-4">
            <div className="card max-w-md w-full p-8 animate-fade-in-up">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
                        <span className="text-3xl font-bold text-white">柔</span>
                    </div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Admin Panel</h1>
                    <p className="text-[var(--text-secondary)] mt-2">Prijavite se za pristup upravljačkoj ploči</p>
                </div>

                <form action={clientAction} className="space-y-6">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-center gap-2 animate-pulse-subtle">
                            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Korisničko ime</label>
                        <input
                            name="handle"
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all"
                            placeholder="admin"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Lozinka</label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <SubmitButton />
                </form>
            </div>
        </div>
    )
}

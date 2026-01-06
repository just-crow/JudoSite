'use client';

import { useState } from 'react';
import { sendMessage } from "@/actions/messages";

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus('submitting');

        const form = event.currentTarget;
        const formData = new FormData(form);

        try {
            const result = await sendMessage(formData);
            if (result.success) {
                setStatus('success');
                form.reset();
            } else {
                setStatus('error');
                setErrorMsg(result.error || 'Došlo je do greške.');
            }
        } catch (e) {
            setStatus('error');
            setErrorMsg('Došlo je do greške prilikom slanja.');
        }
    }

    if (status === 'success') {
        return (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-6 rounded-xl text-center">
                <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h3 className="text-xl font-bold mb-2">Poruka Poslana!</h3>
                <p>Hvala vam na javljanju. Odgovorit ćemo vam u najkraćem roku.</p>
                <button onClick={() => setStatus('idle')} className="mt-4 text-sm underline hover:text-green-300">Pošalji novu poruku</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-[var(--text-secondary)] text-sm mb-2">Ime *</label>
                    <input
                        name="firstName"
                        required
                        type="text"
                        placeholder="Vaše ime"
                        className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--secondary)] transition-colors"
                    />
                </div>
                <div>
                    <label className="block text-[var(--text-secondary)] text-sm mb-2">Prezime</label>
                    <input
                        name="lastName"
                        type="text"
                        placeholder="Vaše prezime"
                        className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--secondary)] transition-colors"
                    />
                </div>
            </div>
            <div>
                <label className="block text-[var(--text-secondary)] text-sm mb-2">Email *</label>
                <input
                    name="email"
                    required
                    type="email"
                    placeholder="vas@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--secondary)] transition-colors"
                />
            </div>
            <div>
                <label className="block text-[var(--text-secondary)] text-sm mb-2">Telefon</label>
                <input
                    name="phone"
                    type="tel"
                    placeholder="+387 6X XXX XXX"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--secondary)] transition-colors"
                />
            </div>
            <div>
                <label className="block text-[var(--text-secondary)] text-sm mb-2">Tema</label>
                <select name="subject" className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] text-black focus:outline-none focus:border-[var(--secondary)] transition-colors">
                    <option value="Opći upit">Opći upit</option>
                    <option value="Članstvo">Članstvo</option>
                    <option value="Treninzi">Treninzi</option>
                    <option value="Takmičenja">Takmičenja</option>
                </select>
            </div>
            <div>
                <label className="block text-[var(--text-secondary)] text-sm mb-2">Poruka *</label>
                <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Vaša poruka..."
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] text-black placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--secondary)] transition-colors resize-none"
                ></textarea>
            </div>

            {status === 'error' && (
                <div className="text-red-400 text-sm p-3 bg-red-900/20 rounded-lg">
                    {errorMsg}
                </div>
            )}

            <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex justify-center"
            >
                {status === 'submitting' ? 'Slanje...' : 'Pošalji poruku'}
            </button>
        </form>
    );
}

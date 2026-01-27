/**
 * Input Validation Utilities
 * Provides secure validation and sanitization for all user inputs
 */

// UUID v4 regex pattern
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// URL regex pattern (supports http/https)
const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

// Date format regex (YYYY-MM-DD)
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export interface ValidationResult {
    valid: boolean;
    error?: string;
}

export interface CompetitionInput {
    title: string;
    date: string;
    location: string;
    description: string;
    registrationLink?: string;
}

export interface CompetitorInput {
    name: string;
    weightCategory?: string;
    achievements?: string;
    image?: string;
}

export interface TrainerInput {
    name: string;
    role?: string;
    image?: string;
}

export interface NewsInput {
    title: string;
    content: string;
    excerpt?: string;
    tags?: string[];
    image?: string;
}

export interface SponsorInput {
    name: string;
    logo?: string;
    website?: string;
    tier?: string;
}

export interface MessageInput {
    name: string;
    email: string;
    subject: string;
    message: string;
}

/**
 * Validates a UUID string
 */
export function isValidUUID(id: string): boolean {
    return UUID_REGEX.test(id);
}

/**
 * Validates a URL string (allows empty strings)
 */
export function isValidURL(url: string): boolean {
    if (!url || url.trim() === '') return true; // Empty URLs are allowed
    return URL_REGEX.test(url);
}

/**
 * Validates a date string in YYYY-MM-DD format
 */
export function isValidDate(date: string): boolean {
    if (!DATE_REGEX.test(date)) return false;
    const parsed = new Date(date);
    return !isNaN(parsed.getTime());
}

/**
 * Validates an email address
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Sanitizes a string by removing potentially dangerous HTML/script content
 */
export function sanitizeString(input: string): string {
    if (!input) return '';
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
        .trim();
}

/**
 * Validates required string field
 */
export function isNonEmptyString(value: unknown): value is string {
    return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Validates string length within bounds
 */
export function isValidLength(value: string, min: number, max: number): boolean {
    const len = value.trim().length;
    return len >= min && len <= max;
}

/**
 * Validates competition input
 */
export function validateCompetitionInput(input: Partial<CompetitionInput>): ValidationResult {
    if (!isNonEmptyString(input.title)) {
        return { valid: false, error: 'Naziv takmičenja je obavezan' };
    }
    if (!isValidLength(input.title, 3, 200)) {
        return { valid: false, error: 'Naziv mora imati između 3 i 200 karaktera' };
    }
    if (!isNonEmptyString(input.date)) {
        return { valid: false, error: 'Datum je obavezan' };
    }
    if (!isValidDate(input.date)) {
        return { valid: false, error: 'Neispravan format datuma' };
    }
    if (!isNonEmptyString(input.location)) {
        return { valid: false, error: 'Lokacija je obavezna' };
    }
    if (!isValidLength(input.location, 2, 200)) {
        return { valid: false, error: 'Lokacija mora imati između 2 i 200 karaktera' };
    }
    if (input.registrationLink && !isValidURL(input.registrationLink)) {
        return { valid: false, error: 'Neispravan URL za prijavu' };
    }
    return { valid: true };
}

/**
 * Validates competitor input
 */
export function validateCompetitorInput(input: Partial<CompetitorInput>): ValidationResult {
    if (!isNonEmptyString(input.name)) {
        return { valid: false, error: 'Ime takmičara je obavezno' };
    }
    if (!isValidLength(input.name, 2, 100)) {
        return { valid: false, error: 'Ime mora imati između 2 i 100 karaktera' };
    }
    return { valid: true };
}

/**
 * Validates trainer input
 */
export function validateTrainerInput(input: Partial<TrainerInput>): ValidationResult {
    if (!isNonEmptyString(input.name)) {
        return { valid: false, error: 'Ime trenera je obavezno' };
    }
    if (!isValidLength(input.name, 2, 100)) {
        return { valid: false, error: 'Ime mora imati između 2 i 100 karaktera' };
    }
    return { valid: true };
}

/**
 * Validates news input
 */
export function validateNewsInput(input: Partial<NewsInput>): ValidationResult {
    if (!isNonEmptyString(input.title)) {
        return { valid: false, error: 'Naslov vijesti je obavezan' };
    }
    if (!isValidLength(input.title, 3, 200)) {
        return { valid: false, error: 'Naslov mora imati između 3 i 200 karaktera' };
    }
    if (!isNonEmptyString(input.content)) {
        return { valid: false, error: 'Sadržaj vijesti je obavezan' };
    }
    return { valid: true };
}

/**
 * Validates sponsor input
 */
export function validateSponsorInput(input: Partial<SponsorInput>): ValidationResult {
    if (!isNonEmptyString(input.name)) {
        return { valid: false, error: 'Naziv sponzora je obavezan' };
    }
    if (!isValidLength(input.name, 2, 100)) {
        return { valid: false, error: 'Naziv mora imati između 2 i 100 karaktera' };
    }
    if (input.website && !isValidURL(input.website)) {
        return { valid: false, error: 'Neispravan URL web stranice' };
    }
    return { valid: true };
}

/**
 * Validates contact message input
 */
export function validateMessageInput(input: Partial<MessageInput>): ValidationResult {
    if (!isNonEmptyString(input.name)) {
        return { valid: false, error: 'Ime je obavezno' };
    }
    if (!isValidLength(input.name, 2, 100)) {
        return { valid: false, error: 'Ime mora imati između 2 i 100 karaktera' };
    }
    if (!isNonEmptyString(input.email)) {
        return { valid: false, error: 'Email je obavezan' };
    }
    if (!isValidEmail(input.email)) {
        return { valid: false, error: 'Neispravan email format' };
    }
    if (!isNonEmptyString(input.subject)) {
        return { valid: false, error: 'Predmet je obavezan' };
    }
    if (!isNonEmptyString(input.message)) {
        return { valid: false, error: 'Poruka je obavezna' };
    }
    if (!isValidLength(input.message, 10, 5000)) {
        return { valid: false, error: 'Poruka mora imati između 10 i 5000 karaktera' };
    }
    return { valid: true };
}

/**
 * Gets a safe error message for production (hides sensitive details)
 */
export function getSafeErrorMessage(error: unknown, defaultMessage: string = 'Došlo je do greške'): string {
    if (process.env.NODE_ENV === 'development') {
        return error instanceof Error ? error.message : defaultMessage;
    }
    return defaultMessage;
}

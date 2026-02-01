export const REGEX = {
    UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    DATE: /^\d{4}-\d{2}-\d{2}$/,
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
};

export function sanitizeString(str: string): string {
    return str.replace(/[<>]/g, '');
}

export function validateUUID(id: string): boolean {
    return REGEX.UUID.test(id);
}

export function validateUrl(url: string): boolean {
    if (!url) return true; // Allow empty URLs if optional
    return REGEX.URL.test(url);
}

export function validateDate(date: string): boolean {
    return REGEX.DATE.test(date);
}

// Entity Validators

export function validateCompetitionInput(data: { title: string; date: string; location: string; description: string; registrationLink?: string }) {
    const errors: string[] = [];
    if (!data.title || data.title.length < 3) errors.push('Title must be at least 3 characters');
    if (!validateDate(data.date)) errors.push('Invalid date format');
    if (!data.location || data.location.length < 2) errors.push('Location is required');
    if (data.registrationLink && !validateUrl(data.registrationLink)) errors.push('Invalid registration URL');

    return { valid: errors.length === 0, error: errors.join(', ') };
}

export function validateCompetitorInput(data: { firstName: string; lastName: string; birthDate: string; category: string; rank: string }) {
    const errors: string[] = [];
    if (!data.firstName || data.firstName.length < 2) errors.push('First name required');
    if (!data.lastName || data.lastName.length < 2) errors.push('Last name required');
    if (!validateDate(data.birthDate)) errors.push('Invalid birth date');
    if (!data.category) errors.push('Category required');
    if (!data.rank) errors.push('Rank required');

    return { valid: errors.length === 0, error: errors.join(', ') };
}

export function validateTrainerInput(data: { firstName: string; lastName: string; role: string; rank: string }) {
    const errors: string[] = [];
    if (!data.firstName || data.firstName.length < 2) errors.push('First name required');
    if (!data.lastName || data.lastName.length < 2) errors.push('Last name required');
    if (!data.role) errors.push('Role required');
    if (!data.rank) errors.push('Rank required');

    return { valid: errors.length === 0, error: errors.join(', ') };
}

export function validateNewsInput(data: { title: string; content: string }) {
    const errors: string[] = [];
    if (!data.title || data.title.length < 5) errors.push('Title must be at least 5 characters');
    if (!data.content || data.content.length < 10) errors.push('Content must be at least 10 characters');

    return { valid: errors.length === 0, error: errors.join(', ') };
}

export function validateGalleryAlbumInput(data: { title: string; date: string; description?: string }) {
    const errors: string[] = [];
    if (!data.title || data.title.length < 3) errors.push('Title must be at least 3 characters');
    if (!validateDate(data.date)) errors.push('Invalid date format');

    return { valid: errors.length === 0, error: errors.join(', ') };
}

export function validateSponsorInput(data: { name: string; website?: string }) {
    const errors: string[] = [];
    if (!data.name || data.name.length < 2) errors.push('Name required');
    if (data.website && !validateUrl(data.website)) errors.push('Invalid website URL');

    return { valid: errors.length === 0, error: errors.join(', ') };
}

export function validateMessageInput(data: { name: string; email: string; subject: string; message: string }) {
    const errors: string[] = [];
    if (!data.name || data.name.length < 2) errors.push('Name required');
    if (!REGEX.EMAIL.test(data.email)) errors.push('Invalid email');
    if (!data.subject || data.subject.length < 3) errors.push('Subject required');
    if (!data.message || data.message.length < 10) errors.push('Message too short');

    return { valid: errors.length === 0, error: errors.join(', ') };
}

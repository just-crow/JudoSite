/**
 * Date Utility Functions
 * Provides consistent date formatting and parsing across the application
 */

/**
 * Parsed competition date with pre-computed values
 */
export interface ParsedDate {
    date: Date;
    day: number;
    month: string;
    year: number;
    fullDate: string;
    shortDate: string;
    isPast: boolean;
    isUpcoming: boolean;
}

/**
 * Gets the start of today (midnight) in local timezone
 */
export function getTodayStart(): Date {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
}

/**
 * Parses a date string and returns pre-computed values for display
 * This avoids creating multiple Date objects for the same date
 */
export function parseCompetitionDate(dateString: string): ParsedDate {
    const date = new Date(dateString);
    const today = getTodayStart();

    return {
        date,
        day: date.getDate(),
        month: date.toLocaleDateString('bs-BA', { month: 'short' }),
        year: date.getFullYear(),
        fullDate: date.toLocaleDateString('bs-BA', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }),
        shortDate: date.toLocaleDateString('bs-BA', {
            day: 'numeric',
            month: 'short'
        }),
        isPast: date < today,
        isUpcoming: date >= today
    };
}

/**
 * Formats a date for display in the calendar
 */
export function formatCalendarDate(dateString: string): { day: number; month: string; year: number } {
    const date = new Date(dateString);
    return {
        day: date.getDate(),
        month: date.toLocaleDateString('bs-BA', { month: 'short' }),
        year: date.getFullYear()
    };
}

/**
 * Formats a date as a short string (e.g., "15. jan")
 */
export function formatShortDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('bs-BA', { day: 'numeric', month: 'short' });
}

/**
 * Sorts competitions by date in ascending order (nearest first)
 */
export function sortByDateAscending<T extends { date: string }>(items: T[]): T[] {
    return [...items].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

/**
 * Sorts competitions by date in descending order (most recent first)
 */
export function sortByDateDescending<T extends { date: string }>(items: T[]): T[] {
    return [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Filters items to only include upcoming (future) dates
 */
export function filterUpcoming<T extends { date: string }>(items: T[]): T[] {
    const today = getTodayStart();
    return items.filter(item => new Date(item.date) >= today);
}

/**
 * Filters items to only include past dates
 */
export function filterPast<T extends { date: string }>(items: T[]): T[] {
    const today = getTodayStart();
    return items.filter(item => new Date(item.date) < today);
}

/**
 * Partitions items into upcoming and past
 */
export function partitionByDate<T extends { date: string }>(items: T[]): { upcoming: T[]; past: T[] } {
    const today = getTodayStart();
    const upcoming: T[] = [];
    const past: T[] = [];

    for (const item of items) {
        if (new Date(item.date) >= today) {
            upcoming.push(item);
        } else {
            past.push(item);
        }
    }

    return { upcoming, past };
}

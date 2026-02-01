export function formatCalendarDate(dateString: string): { day: string; month: string } {
    const d = new Date(dateString);
    return {
        day: d.getDate().toString(),
        month: d.toLocaleString('hr-HR', { month: 'short' }).toUpperCase()
    };
}

export function formatShortDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('hr-HR');
}

export function partitionByDate<T extends { date: string }>(items: T[]) {
    const now = new Date();
    // Reset time for accurate date comparison
    now.setHours(0, 0, 0, 0);

    const upcoming: T[] = [];
    const past: T[] = [];

    items.forEach(item => {
        const itemDate = new Date(item.date);
        itemDate.setHours(0, 0, 0, 0); // Normalize item time

        if (itemDate >= now) {
            upcoming.push(item);
        } else {
            past.push(item);
        }
    });

    return { upcoming, past };
}

export function sortByDateAscending<T extends { date: string }>(items: T[]): T[] {
    return [...items].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

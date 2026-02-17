import { supabase } from '@/lib/supabase'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface JudoManagerCompetition {
    idCompetition: number
    name: string
    city: string
    countryShort: string
    dateFrom: string
    dateTo: string
    categories: string
    externalId: string
    rang: string
    numberOfAthletes: number
}

interface JudoManagerResponse {
    list: JudoManagerCompetition[]
    hasMore: boolean
    count: number | null
}

export interface CompetitionSyncSummary {
    fetched: number
    inserted: number
    updated: number
    skipped: number
    errors: string[]
}

/* ------------------------------------------------------------------ */
/*  JudoManager JSON API                                               */
/* ------------------------------------------------------------------ */

const JUDOMANAGER_API = 'https://datav2.judomanager.com/api/Competition/GetCompetitions'
const BIH_COUNTRY_ID = 47

function formatDateParam(date: Date): string {
    return date.toISOString().split('T')[0]
}

async function fetchBihCompetitions(): Promise<JudoManagerCompetition[]> {
    const now = new Date()
    const dateFrom = formatDateParam(new Date(now.getFullYear(), 0, 1))
    const dateTo = formatDateParam(new Date(now.getFullYear() + 1, 11, 31))

    const response = await fetch(JUDOMANAGER_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/plain',
            'User-Agent': 'ZeljeznicarSyncBot/1.0',
        },
        body: JSON.stringify({
            dateFrom,
            dateTo,
            limit: 200,
            countryIds: [BIH_COUNTRY_ID],
        }),
        cache: 'no-store',
    })

    if (!response.ok) {
        throw new Error(`JudoManager API returned ${response.status}`)
    }

    const data: JudoManagerResponse = await response.json()
    return data.list ?? []
}

/* ------------------------------------------------------------------ */
/*  Sync engine                                                        */
/* ------------------------------------------------------------------ */

export async function syncCompetitionsFromJudoManager(): Promise<CompetitionSyncSummary> {
    const summary: CompetitionSyncSummary = {
        fetched: 0,
        inserted: 0,
        updated: 0,
        skipped: 0,
        errors: [],
    }

    const competitions = await fetchBihCompetitions()
    summary.fetched = competitions.length

    for (const comp of competitions) {
        const date = comp.dateFrom?.split('T')[0]
        if (!date || !comp.name) {
            summary.skipped += 1
            continue
        }

        const title = comp.name.trim()
        const location = [comp.countryShort, comp.city].filter(Boolean).join(', ')
        const description = [
            comp.categories ? `Kategorije: ${comp.categories}` : '',
            comp.rang ?? '',
        ].filter(Boolean).join(' | ') || 'Uvezeno sa JudoManager kalendara'

        const registrationLink = comp.externalId
            ? `https://portal.judomanager.com/competition/${comp.externalId}`
            : null

        try {
            /* Upsert: match on title + date (unique enough for judo comps) */
            const { data: existing, error: lookupError } = await supabase
                .from('competitions')
                .select('id')
                .eq('title', title)
                .eq('date', date)
                .maybeSingle()

            if (lookupError) {
                summary.errors.push(`Lookup failed for '${title}': ${lookupError.message}`)
                summary.skipped += 1
                continue
            }

            const payload = {
                title,
                date,
                location,
                description,
                application_link: registrationLink,
            }

            if (existing?.id) {
                const { error: updateError } = await supabase
                    .from('competitions')
                    .update(payload)
                    .eq('id', existing.id)

                if (updateError) {
                    summary.errors.push(`Update failed for '${title}': ${updateError.message}`)
                    summary.skipped += 1
                    continue
                }

                summary.updated += 1
            } else {
                const { error: insertError } = await supabase
                    .from('competitions')
                    .insert(payload)

                if (insertError) {
                    summary.errors.push(`Insert failed for '${title}': ${insertError.message}`)
                    summary.skipped += 1
                    continue
                }

                summary.inserted += 1
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown sync error'
            summary.errors.push(`Unexpected error for '${title}': ${message}`)
            summary.skipped += 1
        }
    }

    return summary
}

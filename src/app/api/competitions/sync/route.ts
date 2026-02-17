import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { syncCompetitionsFromJudoManager } from '@/lib/competition-sync'

export const dynamic = 'force-dynamic'

function isAuthorized(req: NextRequest): boolean {
    const configured = process.env.JUDOMANAGER_SYNC_SECRET || process.env.CRON_SECRET
    if (!configured) return false

    const authHeader = req.headers.get('authorization')
    const bearer = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null
    const customHeader = req.headers.get('x-sync-secret')
    const querySecret = req.nextUrl.searchParams.get('secret')

    return [bearer, customHeader, querySecret].some((value) => value === configured)
}

async function runSync(req: NextRequest) {
    if (!isAuthorized(req)) {
        return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const result = await syncCompetitionsFromJudoManager()

        revalidatePath('/')
        revalidatePath('/kalendar')
        revalidatePath('/admin/competitions')

        return NextResponse.json({ ok: true, result })
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        return NextResponse.json({ ok: false, error: message }, { status: 500 })
    }
}

export async function GET(req: NextRequest) {
    return runSync(req)
}

export async function POST(req: NextRequest) {
    return runSync(req)
}

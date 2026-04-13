import { revalidateTag, revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET() {
    revalidateTag('competitors-v3');
    revalidateTag('competitors-v2');
    revalidateTag('competitors');
    revalidatePath('/takmicari');
    return NextResponse.json({ message: 'cache cleared!' });
}
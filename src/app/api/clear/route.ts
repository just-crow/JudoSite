import { revalidateTag, revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET() {
    revalidatePath('/takmicari');
    return NextResponse.json({ message: 'cache cleared!' });
}
import { NextRequest, NextResponse } from 'next/server';
export async function GET(request: NextRequest, response: NextResponse) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const audio = searchParams.get("audio")
    // return Response.json({ data: 'hieu' })
    return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${audio}`)
}
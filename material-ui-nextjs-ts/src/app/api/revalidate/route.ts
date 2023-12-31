import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
    if (request.nextUrl.origin === process.env.NEXTAUTH_URL) {
        const tag = request.nextUrl.searchParams.get('tag')
        if (!tag) {
            return NextResponse.json({ 'message': 'Missing tag param' }, { status: 400 })
        }
        revalidateTag(tag)
        return NextResponse.json({ revalidated: true, now: Date.now() })
    }
    return NextResponse.json({ 'message': 'Sth went wrong' }, { status: 500 })
}
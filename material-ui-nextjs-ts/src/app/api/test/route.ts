import { NextRequest, NextResponse } from 'next/server'
function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
export async function GET(request: NextRequest, response: NextResponse) {
    const rand = randomInt(1, 1000000)
    return NextResponse.json({ daya: rand })
}
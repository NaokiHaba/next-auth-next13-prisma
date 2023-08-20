import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse(
            JSON.stringify({
                status: 'fail',
                message: 'Not authenticated'
            }),
            {status: 401})
    }

    return NextResponse.json({
        // !!session は session が null または undefined でないことを表す
        authenticated: !!session,
        session
    })
}
import { NextRequest, NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
    try {
        const {name, email, password} = ( await request.json() ) as {
            name: string
            email: string
            password: string
        }

        const hashedPassword = await hash(password, 12)

        const user = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: hashedPassword
            }
        })

        return NextResponse.json({
            user: {
                name: user.name,
                email: user.email
            }
        })

    } catch (e: any) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: e.message
            }),
            {status: 500}
        )
    }
}
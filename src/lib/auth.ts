import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import { compare } from "bcryptjs"

export const authOptions: NextAuthOptions = {
    // ユーザーセッションの保存方法
    session: {
        strategy: "jwt"
    },
    providers: [
        Credentials({
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                // パスワードをハッシュ化して比較する
                if (!user || !( await compare(credentials.password, user.password) )) {
                    return null;
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    randomKey: "Hey cool"
                }
            }
        })
    ],
    callbacks: {
        session: ({session, token}) => {
            console.log("session callback", {session, token})
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    randomKey: token.randomKey
                }
            }
        },
        jwt: ({token, user}) => {
            console.log("jwt callback", {token, user})
            if (user) {
                const u = user as unknown as any
                return {
                    ...token,
                    id: u.id,
                    randomKey: u.randomKey
                }
            }

            return token
        }
    }
}
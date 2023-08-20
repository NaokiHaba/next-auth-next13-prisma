// use client」が必要なのは、React Server Componentsを使うか
// それと互換性のあるライブラリを構築する場合だけだ。
'use client'

import { signIn, signOut } from "next-auth/react"
import Link from "next/link"

export const LoginButton = () => {
    return (
        <button style={{marginRight: '10px'}} onClick={() => signIn()}>
            Sign in
        </button>
    )
}

export const LogoutButton = () => {
    return (
        <button style={{marginRight: '10px'}} onClick={() => signOut()}>
            Sign out
        </button>
    )
}

export const RegisterButton = () => {
    return (
        <Link href={'/register'} style={{marginRight: '10px'}}>
            Register
        </Link>
    )
}

export const ProfileButton = () => {
    return (
        <Link href={'/profile'} style={{marginRight: '10px'}}>
            Profile
        </Link>
    )
}
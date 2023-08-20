'use client'

import { useState } from "react"
import { signIn } from "next-auth/react";

export const RegisterForm = () => {
    const [ loading, setLoading ] = useState(false)
    const [ formValues, setFormValues ] = useState({
        email: '',
        password: '',
        name: ''
    })

    const onSubmit = async (e: React.FormEvent) => {
        // ページのリロードを防ぐ
        e.preventDefault()

        setLoading(true)

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValues)
            })

            setLoading(false)

            if (!res.ok) {
                alert(( await res.json() ).message);
                return;
            }

            await signIn(undefined, {
                callbackUrl: "/"
            })

            alert('登録しました！')
        } catch (err: any) {
            setLoading(false);
            console.error(err);
            alert(err.message);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        setFormValues({
            ...formValues,
            [ name ]: value
        })
    }

    return (
        <form
            onSubmit={onSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
                width: 500,
                rowGap: 10
            }}
        >
            <label htmlFor="name">Name</label>
            <input
                required
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                style={{padding: "1rem"}}
            />
            <label htmlFor="email">Email</label>
            <input
                required
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                style={{padding: "1rem"}}
            />
            <label htmlFor="password">Password</label>
            <input
                required
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                style={{padding: "1rem"}}
            />
            <button
                style={{
                    backgroundColor: `${loading ? "#ccc" : "#3446eb"}`,
                    color: "#fff",
                    padding: "1rem",
                    cursor: "pointer"
                }}
                disabled={loading}
            >
                {loading ? "loading..." : "Register"}
            </button>
        </form>
    )
}


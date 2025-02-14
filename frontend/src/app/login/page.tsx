"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { loginUser } from "@/services/api"
import { setToken } from "@/utils/localStorage"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const data = await loginUser(email, password)
            setToken(data.token)
            localStorage.setItem('username', data.user.username)
            router.push("/dashboard")
        } catch (error) {
            console.error("Login failed:", error)
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-xs">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="mb-4 w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="mb-4 w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                    required
                />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
                    Login
                </button>
            </form>
        </div>
    )
}


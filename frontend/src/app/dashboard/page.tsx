"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getBooks, logoutUser } from "@/services/api"
import { getToken, removeToken } from "@/utils/localStorage"

interface Book {
    id: string
    title: string
    author: string
}

export default function Dashboard() {
    const [books, setBooks] = useState<Book[]>([])
    const router = useRouter()

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const token = getToken()
                if (!token) {
                    router.push("/login")
                    return
                }
                const fetchedBooks = await getBooks(token)
                setBooks(fetchedBooks)
            } catch (error) {
                console.error("Failed to fetch books:", error)
            }
        }

        fetchBooks()
    }, [router])

    const handleLogout = async () => {
        try {
            await logoutUser()
            removeToken()
            router.push("/login")
        } catch (error) {
            console.error("Logout failed:", error)
        }
    }

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <button
                onClick={handleLogout}
                className="mb-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>
            <h2 className="text-xl font-semibold mb-2">Available Books</h2>
            <ul>
                {books.map((book) => (
                    <li key={book.id} className="mb-2">
                        {book.title} by {book.author}
                    </li>
                ))}
            </ul>
        </div>
    )
}


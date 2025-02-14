"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getBooks} from "@/services/api"
import { getToken, removeToken } from "@/utils/localStorage"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface Book {
    xata_id: string
    name: string
    author: string
    details: string
    price: number
    imageURL: string
}

export default function Dashboard() {
    const [books, setBooks] = useState<Book[]>([])
    const [username, setUsername] = useState("")
    const router = useRouter()
    const [selectedBook, setSelectedBook] = useState<Book | null>(null)

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

    useEffect(() => {
        const storedUsername = localStorage.getItem('username')
        if (storedUsername) {
            setUsername(storedUsername)
        }
    }, [])

    const handleLogout = async () => {
        try {
            // await logoutUser()
            removeToken()
            localStorage.removeItem('username')
            router.push("/")
        } catch (error) {
            console.error("Logout failed:", error)
        }
    }

    return (
        <DashboardLayout username={username} onLogout={handleLogout}>
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">Available Books</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Author
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {books.map((book) => (
                                <tr key={book.xata_id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                        <div className="text-sm font-medium text-gray-900">{book.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                        <div className="text-sm text-gray-500">{book.author}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button 
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    onClick={() => setSelectedBook(book)}
                                                >
                                                    View
                                                </button>
                                            </DialogTrigger>
                                            
                                            {selectedBook && (
                                                <DialogContent className="sm:max-w-[425px] dark:bg-gray-800">
                                                    <div className="space-y-4">
                                                        <div className="dark:bg-gray-700 rounded-lg overflow-hidden">
                                                            <img 
                                                                src={selectedBook.imageURL} 
                                                                alt={selectedBook.name}
                                                                className="w-full h-48 object-cover"
                                                            />
                                                        </div>
                                                        <h3 className="text-lg font-bold dark:text-gray-100">{selectedBook.name}</h3>
                                                        <p className="text-sm dark:text-gray-300">by {selectedBook.author}</p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                                            {selectedBook.details}
                                                        </p>
                                                        <p className="text-sm font-semibold dark:text-gray-100">
                                                            Price: ${selectedBook.price.toFixed(2)}
                                                        </p>
                                                        <button
                                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded dark:bg-blue-700 dark:hover:bg-blue-800"
                                                            onClick={() => alert('Checkout functionality to be implemented')}
                                                        >
                                                            Checkout
                                                        </button>
                                                    </div>
                                                </DialogContent>
                                            )}
                                        </Dialog>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    )
}


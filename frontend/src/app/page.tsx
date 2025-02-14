import Link from "next/link"
import { BookOpen } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-foreground">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen text-center">
        <div className="mb-8 animate-bounce">
          <BookOpen className="w-16 h-16 text-blue-600" />
        </div>
        
        <h1 className="text-5xl font-bold mb-4 text-gray-800 dark:text-gray-200 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-200">
          Kenya One Bookshop
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl">
          Your one-stop destination for managing books, inventory, and sales with ease.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Link 
            href="/login" 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Login
          </Link>
          
          <Link 
            href="/register" 
            className="flex-1 bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-blue-600 transform hover:-translate-y-1"
          >
            Register
          </Link>
        </div>
        
        <div className="mt-16 text-black-500">
          <p className="text-sm">
            © 2025 Kenya One Bookshop. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  )
}
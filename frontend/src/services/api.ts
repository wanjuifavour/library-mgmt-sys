const API_URL = "http://localhost:8085/api"

export const registerUser = async (username: string, email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
    })
    if (!response.ok) {
        throw new Error("Registration failed")
    }
    return response.json()
}

export const loginUser = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
    if (!response.ok) {
        throw new Error("Login failed")
    }
    return response.json()
}

export const getBooks = async (token: string) => {
    const response = await fetch(`${API_URL}/books`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    if (!response.ok) {
        throw new Error("Failed to fetch books")
    }
    return response.json()
}

export const createBook = async (token: string, bookData: { 
    name: string; 
    author: string; 
    details: string; 
    price: number;
    imageURL: string 
}) => {
    const response = await fetch(`${API_URL}/books/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
    })
    if (!response.ok) {
        throw new Error("Failed to create book")
    }
    return response.json()
}


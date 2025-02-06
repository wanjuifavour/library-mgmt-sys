const API_URL = "http://localhost:8085"

export const registerUser = async (username: string, email: string, password: string) => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
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
    const response = await fetch(`${API_URL}/api/auth/login`, {
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

export const logoutUser = async () => {
    const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
    })
    if (!response.ok) {
        throw new Error("Logout failed")
    }
    return response.json()
}

export const getBooks = async (token: string) => {
    const response = await fetch(`${API_URL}/api/books`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    if (!response.ok) {
        throw new Error("Failed to fetch books")
    }
    return response.json()
}


import type { Request, Response, NextFunction } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { getXataClient } from "../config/xata"

const xata = getXataClient()

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { username, email, password } = req.body

        const existingUser = await xata.db.users.filter({ email }).getFirst()
        if (existingUser) {
            res.status(400).json({ message: "User already exists" })
            return
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await xata.db.users.create({
            username,
            email,
            password: hashedPassword,
        })

        res.status(201).json({ message: "User registered successfully", userId: newUser.xata_id })
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error" })
    }
}

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body

        const user = await xata.db.users.filter({ email }).getFirst()
        if (!user || !user.password) {
            res.status(400).json({ message: "Invalid credentials" })
            return
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" })
            return
        }

        const token = jwt.sign({ userId: user.xata_id }, process.env.JWT_SECRET as string, {
            expiresIn: "1h",
        })

        res.json({ token, user: { id: user.xata_id, username: user.username, email: user.email } })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

export const logout = (req: Request, res: Response) => {
    // In a stateless JWT setup, logout is typically handled on the client-side
    // by removing the token from local storage
    res.json({ message: "Logout successful" })
}


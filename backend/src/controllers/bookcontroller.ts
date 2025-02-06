import type { Request, Response } from "express"
import { getXataClient } from "../config/xata"

const xata = getXataClient()

export const getBooks = async (req: Request, res: Response) => {
    try {
        const books = await xata.db.books.getAll()
        res.json(books)
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}
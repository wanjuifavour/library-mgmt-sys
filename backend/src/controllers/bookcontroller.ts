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

export const createBook = async (req: Request, res: Response) => {
        try {
            const { name, author, details, price, imageURL } = req.body
            const book = await xata.db.books.create({
                name: name.toUpperCase(),
                author,
                details,
                price,
                imageURL: imageURL || 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D'
            })
            res.status(201).json(book)
        } catch (error) {
            res.status(500).json({ message: "Server error" })
        }
    }
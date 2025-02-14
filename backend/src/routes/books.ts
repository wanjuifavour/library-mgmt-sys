import express from "express"
import { createBook, getBooks } from "../controllers/bookcontroller"
import { authMiddleware } from "../middleware/auth"

const router = express.Router()

router.get("/", authMiddleware as express.RequestHandler, getBooks)
router.post("/add", createBook)

export default router
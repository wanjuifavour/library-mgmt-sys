import express from "express"
import { getBooks } from "../controllers/bookcontroller"
import { authMiddleware } from "../middleware/auth"

const router = express.Router()

router.get("/", authMiddleware as express.RequestHandler, getBooks)

export default router
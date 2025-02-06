import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth"
import bookRoutes from "./routes/books"

import dotenv from 'dotenv';
dotenv.config();


console.log('XATA_API_KEY:', process.env.XATA_API_KEY ? 'Present' : 'Missing');
console.log('XATA_DATABASE_URL:', process.env.XATA_DATABASE_URL ? 'Present' : 'Missing');

const app = express()
const port = process.env.PORT || 8085

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/books", bookRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
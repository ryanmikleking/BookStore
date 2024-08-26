import express from 'express'
import mongoose from 'mongoose'
import { PORT, DB_URL } from "./config.js"
import { Book } from "./models/bookModel.js"
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'

const app = express()

app.use(express.json())

app.use(cors(
     {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
     },
     {
        origin: 'http://localhost:5555',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
     }
))
 
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowHeaders: ['Content-Type'],

// }))

app.get ('/', (req, res) => {
    //console.log(req)

    return res.status(234).send('Welcome To MERN Stack Tutorial')
})

app.use('/books', booksRoute)

mongoose
    .connect(DB_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`)
        })
        console.log('App connected to database')
    })
    .catch((err) => {
        console.log(err)
    })

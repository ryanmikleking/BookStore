import express from 'express'
import { Book } from '../models/bookModel.js'
import mongoose from 'mongoose'

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        console.log(`starting to try post request`)
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            res.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }

        const book = await Book.create(newBook)
        return res.status(201).send(book)
    } catch (err) {
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
})

// All Books from the database
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({})

        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (err) {
        console.log(err.message)
        response.status(500).send({ message: err.message })
    }
})

// Route for One Books from the database by ID
router.get('/:id', async (req, res) => {
    try {
        
        const { id } = req.params
        //console.log(mongoose.Types.ObjectId.isValid(id))

        const book = await Book.findById(id)

        return res.status(200).json({book})
    } catch (err) {
        console.log(err.message)
        res.status(500).send({ message: 'err.message' })
    }
})

// Route for Update a Book
router.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {

            return res.status(400).send({
                message: 'Send all require fields: title, author, publishYear',
            })
        }

        const { id } = req.params


        const result = await Book.findByIdAndUpdate(id, req.body)

        

        if (!result) {
            return res.status(404).json({ message: 'Book not found' })
        }

        return res.status(200).send({ message: 'Book updated succesfully' })
        
    } catch(err) { 
        console.log(err.message)
        res.status(500)
    }
})

// Route for Delete Book
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const result = await Book.findByIdAndDelete(id)
        console.log(result)

        if(!result) {
            return res.status(404).json({ message: 'Book deleted successfully' })
        }
        console.log('Finished Delete.')
        return res.status(200).send({ message: 'Book Deleted Successfully' })

    } catch (err) {
        console.log(`Router ${err.message}`)
        res.status(500)
    } finally {
        req.destroy()
        console.log(`process completed`)
    }
})

export default router
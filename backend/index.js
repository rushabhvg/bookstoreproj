import express from "express";    // import express framework   for Node.js
import { PORT, mongoDBURL } from "./config.js"; // import PORT and mongoDBURL from config.js
import mongoose from "mongoose";    // import mongoose  ODM for MongoDB
import { Book } from "./models/bookModel.js";   // import Book model from bookModel.js 

const app = express();

// Middleware to parse the body of the request
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to the BookStoreProj!');
});

// Route to Save a new book to the database
app.post('/books', async (request, response) => {
    try {
        if (
            !request.body.title || 
            !request.body.author || 
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: "Required field(s) missing!"
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});

// Route to get all books from the database
app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});

// Route to get book by ID from the database
app.get('/books/:id', async (request, response) => {
    try {
        
        const { id } = request.params;

        const book = await Book.findById(id);
        
        return response.status(200).json(book);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});

// Route to update book by ID from the database
app.put('/books/:id', async (request, response) => {
    try {
        if (
            !request.body.title || 
            !request.body.author || 
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: "Required field(s) missing!"
            });
        }

        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);
        
        if(!result) {
            return response.status(404).json({ message: `Book with id ${id} is not found!`});
        }

        return response.status(200).send({ message: `Book with id ${id} is updated!`});

    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});

// Route to delete book by ID from the database
app.delete('/books/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result) {
            return response.status(404).json({ message: `Book with id ${id} is not found!`});
        }
        
        return response.status(200).send({ message: `Book with id ${id} is deleted!`});
        
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});

mongoose
    .connect(mongoDBURL)
    .then(() => {
        // if all is ok we will be here
        console.log("MongoDB connected to the App");
        // start the server only if connected to the DB
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
          });
    })
    .catch((error) => {
        // if error we will be here
        console.log(error);
    });
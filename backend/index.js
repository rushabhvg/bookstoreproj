import express from "express";    // import express framework   for Node.js
import { PORT, mongoDBURL } from "./config.js"; // import PORT and mongoDBURL from config.js
import mongoose from "mongoose";    // import mongoose  ODM for MongoDB
import { Book } from "./models/bookModel.js";   // import Book model from bookModel.js 
import booksRoute from "./routes/booksRoute.js"; // import booksRoute from booksRoute.js

const app = express();

// Middleware to parse the body of the request
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to the BookStoreProj!');
});

app.use("/books", booksRoute);

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
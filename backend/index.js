import express from "express";    // import express framework   for Node.js
import { PORT, mongoDBURL } from "./config.js"; // import PORT and mongoDBURL from config.js
import mongoose from "mongoose";    // import mongoose  ODM for MongoDB

const app = express();

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to the BookStoreProj!');
});

// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

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
import express from "express"; // import express framework   for Node.js
import { PORT, mongoDBURL } from "./config.js"; // import PORT and mongoDBURL from config.js
import mongoose from "mongoose"; // import mongoose  ODM for MongoDB
import booksRoute from "./routes/booksRoute.js"; // import booksRoute from booksRoute.js
import cors from "cors"; // import cors middleware

const app = express();

// Middleware to parse the body of the request
app.use(express.json());

// Middleware to enable CORS Policy
// Option 1: Allow all origins with Default cors(*)
app.use(cors());
// Option 2: Allow only custom origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "PUT", "POST", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to the BookStoreProj!");
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

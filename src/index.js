import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { usersRouter } from "./routes/users.js";
import { booksRouter } from "./routes/books.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", usersRouter);
app.use("/books", booksRouter);

mongoose.connect(process.env.MONGODB_URI);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

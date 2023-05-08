import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { BookModel } from "../models/Books.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await BookModel.find({});
    res.json(response);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/", verifyToken, async (req, res) => {
  const book = new BookModel(req.body);
  try {
    const response = await book.save();
    res.json(response);
  } catch (error) {
    res.json({ message: error });
  }
});

router.put("/", verifyToken, async (req, res) => {
  try {
    const book = await BookModel.findById(req.body.bookID);
    const user = await UserModel.findById(req.body.userID);
    user.savedBooks.push(book);
    await user.save();
    res.json({ savedBooks: user.savedBooks });
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/savedBooks/ids/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.json({ savedBooks: user?.savedBooks });
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/savedBooks/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const savedBooks = await BookModel.find({
      _id: { $in: user.savedBooks },
    });
    res.json({ savedBooks });
  } catch (error) {
    res.json({ message: error });
  }
});

export { router as booksRouter };

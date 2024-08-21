import express from "express";
import { Book } from "../models/bookModel.js";
import { StatusCodes } from "http-status-codes";

const bookRoute = express.Router();

bookRoute.get("/book/:id", async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `book not found with ${id}` });
    }
    res.status(StatusCodes.OK).json({ data: book });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Internal server failure" });
  }
});
bookRoute.post("/book", async (req, res) => {
  try {
    const { title, author, year } = req.body;
    if (!title || !author || !year) {
      return res
        .status(StatusCodes.ACCEPTED)
        .json({ msg: "Please provide title author year" });
    }
    await Book.create(req.body);
    res.status(StatusCodes.OK).json({ msg: "Book Added SuccessFully" });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.BAD_GATEWAY)
      .json({ msg: "Internal Server Failure" });
  }
});

bookRoute.delete("/Book/:id", async (req, res) => {
  // res.send("Delete a Book");
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Book not found with id-${id}` });
    res.status(StatusCodes.OK).json({ msg: "Book Deleted", data: req.body });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Internal server error" });
  }
});
bookRoute.get("/book", async (req, res) => {
  try {
    const books = await Book.find();
    if (!books) {
      return res.status(StatusCodes.OK).json({ msg: "Books Not Avaialable" });
    }
    res.status(StatusCodes.OK).json({ counts: books.length, data: books });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "internal server failure" });
  }
});

bookRoute.put("/book/:id", async (req, res) => {
  //console.log(req.body);
  const { id } = req.params;
  try {
    const { author, title, year } = req.body;
    if (!author || !title || !year) {
      return res
        .status(StatusCodes.ACCEPTED)
        .json({ msg: "please provide all details" });
    }
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Book not found with id-${id}` });
    }
    res.status(StatusCodes.OK).json({ msg: "BOOK UPDATED", data: req.body });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_GATEWAY).json({ msg: "Internal Servor error" });
  }
});
export default bookRoute;

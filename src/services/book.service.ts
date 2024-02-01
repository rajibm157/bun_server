import * as mongoose from "mongoose";
import { HTTPException } from "hono/http-exception";
import { Book } from "~schemas";

export const getAllBooks = async () => {
  const books = await Book.find({}).populate("owner");
  return { data: books };
};

export const getBookDetails = async (id: string) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new HTTPException(404, { message: "Id not valid." });
  }
  const book = await Book.findById(id).populate("owner");
  if (!book) {
    throw new HTTPException(401, { message: "Book not found." });
  }
  return { data: book };
};

export const createBook = async (params: Book) => {
  const book = new Book(params);
  (await book.save()).populate("owner");
  return { data: book };
};

export const updateBook = async (id: string, params: Book) => {
  const book = await Book.findByIdAndUpdate(id, params, { new: true }).populate(
    "owner"
  );
  return { data: book };
};

export const deleteBook = async (id: string) => {
  const book = await Book.deleteOne({ _id: id });
  return { data: book };
};

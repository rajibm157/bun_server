import * as mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    author: { type: String, required: true },
    owner_id: { type: String, required: true },
    owner: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export type Book = mongoose.InferSchemaType<typeof bookSchema>;
export const Book = mongoose.model("Book", bookSchema);

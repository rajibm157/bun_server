import * as mongoose from "mongoose";

export async function connect() {
  return await mongoose
    .connect(process.env.DB_URL as string)
    .then(() => console.log("Database connected"))
    .catch((err) => console.log("Failed to connect database", err));
}

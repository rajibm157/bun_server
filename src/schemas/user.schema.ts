import * as mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
  },
  {
    timestamps: true,
    methods: {
      hashPassword() {
        console.log(`${this.password}!`);
      },
    },
  }
);

export type User = mongoose.InferSchemaType<typeof userSchema>;
export const User = mongoose.model("User", userSchema);

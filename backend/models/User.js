import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    created_at: { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

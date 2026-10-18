import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, default: "Code" },
    level: { type: Number, default: 50 },
    sort_order: { type: Number, default: 0 },
    created_at: { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: true }
);

export const Skill = mongoose.model("Skill", skillSchema);

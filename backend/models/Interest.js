import mongoose from "mongoose";

const interestSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    emoji: { type: String, default: "✨" },
    sort_order: { type: Number, default: 0 },
    created_at: { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: true }
);

export const Interest = mongoose.model("Interest", interestSchema);

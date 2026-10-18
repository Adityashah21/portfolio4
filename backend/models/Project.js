import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    tech: { type: [String], default: [] },
    live_url: { type: String, default: null },
    repo_url: { type: String, default: null },
    image_url: { type: String, default: null },
    sort_order: { type: Number, default: 0 },
    created_at: { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);

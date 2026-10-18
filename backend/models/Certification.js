import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    issuer: { type: String, default: "" },
    issued_on: { type: String, default: null },
    credential_url: { type: String, default: null },
    image_url: { type: String, default: null },
    sort_order: { type: Number, default: 0 },
    created_at: { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: true }
);

export const Certification = mongoose.model("Certification", certificationSchema);

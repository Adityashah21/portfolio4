import mongoose from "mongoose";
import { readDb } from "./db.js";
import { User, Project, Skill, Certification, Interest } from "./models/index.js";

let isConnected = false;

export function isMongoConnected() {
  return isConnected && mongoose.connection.readyState === 1;
}

export async function connectMongo() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log("ℹ️ MONGODB_URI not provided. Running in file-based storage mode (data/db.json).");
    return false;
  }

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log("🍃 Connected to MongoDB Atlas successfully.");

    await seedMongoIfEmpty();
    return true;
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB Atlas:", err.message);
    console.log("⚠️ Falling back to local file-based storage (data/db.json).");
    isConnected = false;
    return false;
  }
}

async function seedMongoIfEmpty() {
  try {
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      console.log("🌱 Database is empty. Seeding initial portfolio data from db.json...");
      const fileData = readDb();

      if (fileData.projects?.length) {
        await Project.insertMany(fileData.projects);
      }
      if (fileData.skills?.length) {
        await Skill.insertMany(fileData.skills);
      }
      if (fileData.certifications?.length) {
        await Certification.insertMany(fileData.certifications);
      }
      if (fileData.interests?.length) {
        await Interest.insertMany(fileData.interests);
      }
      if (fileData.users?.length) {
        await User.insertMany(fileData.users);
      }
      console.log("✅ Initial portfolio data seeded into MongoDB Atlas.");
    }
  } catch (err) {
    console.error("Error during initial data seeding:", err);
  }
}

import { v2 as cloudinary } from "cloudinary";


export function isCloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

export function initCloudinary() {
  if (isCloudinaryConfigured()) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    console.log("☁️ Cloudinary initialized for persistent cloud media uploads.");
    return true;
  }
  return false;
}

export function uploadToCloudinary(buffer, originalFilename = "upload") {
  return new Promise((resolve, reject) => {
    if (!isCloudinaryConfigured()) {
      return reject(new Error("Cloudinary credentials are not configured in environment variables."));
    }

    const folder = process.env.CLOUDINARY_FOLDER || "questfolio";
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
        public_id: `${Date.now()}_${originalFilename.replace(/[^a-zA-Z0-9_-]/g, "_")}`,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return reject(error);
        }
        resolve(result);
      }
    );

    // Stream the memory buffer to Cloudinary
    uploadStream.end(buffer);
  });
}

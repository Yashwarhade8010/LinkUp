const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "uploads" },
        (error, cloudinaryResult) => {
          if (error) return reject(error);
          resolve(cloudinaryResult.secure_url);
        }
      );
      uploadStream.end(fileBuffer);
    });
  };

module.exports={
    uploadToCloudinary
}
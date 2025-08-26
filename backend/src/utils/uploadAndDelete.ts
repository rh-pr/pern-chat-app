import cloudinary from "../cloudinary/cloudinary.js";
import fs from "fs/promises";

export const uploadAndDelete = async (filePath: string) => {
    const uploadResult = await cloudinary.uploader.upload(filePath, { folder: 'profilePic' });
    try {
         fs.unlink(filePath);
    } catch (err) {
        console.error('Failed to delete file', filePath, err);
    }
    return uploadResult.secure_url;
};

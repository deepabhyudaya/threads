import { v2 as cloudinary } from "cloudinary";

const CLOUDINARY_CLOUD_NAME = process.env
  .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;
const CLOUDINARY_API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET as string;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export default cloudinary;

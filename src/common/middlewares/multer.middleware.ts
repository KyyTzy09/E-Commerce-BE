import cloudinary from "../configs/cloudinary.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params : () => {
    return {
      folder : "profile",
      allowed_formats : ["jpg" , "png" , "jpeg", "webp"],
      public_id : Date.now().toString()
    }
  }
})

export const upload = multer({storage});

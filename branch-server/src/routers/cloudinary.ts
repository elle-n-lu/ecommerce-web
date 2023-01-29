
import "dotenv-safe/config";

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });

  export const upload = async (file:any) =>{
    const image = await cloudinary.uploader.upload(
        file,
        (result:any)=>result
    )
    return image
  }
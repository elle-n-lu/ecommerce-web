import multer from "multer";

const storage = multer.diskStorage({
    destination: (_:any, _file, cb) => {
      cb(null, __dirname + "/images");
    },
    filename: (_, file, cb) => {
      cb(null, file.originalname);
    },
  });

 export const multerupload = multer({ storage: storage });
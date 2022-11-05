import multer from "multer";

export const upload = multer({
  dest: "",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image of type png,jpeg or jpg"));
    }
    cb(null, true);
  },
});

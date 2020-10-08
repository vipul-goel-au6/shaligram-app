const multer = require("multer");

module.exports = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 1024 * 1024 *30 },
  fileFilter: (req, file, cb) => {
    if (
      !file.mimetype.match(
        /jpg|jpeg|png|gif|tiff|bmp|bpg|svg|heif|psd|avi|flv|wmv|mov|mp4|webm|vob|mng|qt|mpg|mpeg|3gp$i/
      )
    ) {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

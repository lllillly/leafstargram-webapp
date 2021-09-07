const express = require("express");
const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);

      done(null, basename + "_" + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 2048 },
});

const router = express.Router();

// 이미지 업로드
router.post("/image", upload.single("image"), (req, res, next) => {
  console.log(req.file);

  return res.status(200).json({ path: req.file.path });
});

// 피드 생성

module.exports = router;

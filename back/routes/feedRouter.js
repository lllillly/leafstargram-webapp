const express = require("express");
const multer = require("multer");
const path = require("path");
const { Feed, User } = require("../models");

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
router.post("/create", async (req, res, next) => {
  const { content, filePath } = req.body;

  let title = "";

  if (String(content).length > 10) {
    title = content.substring(0, 10);
  } else {
    title = content;
  }

  try {
    await Feed.create({
      title,
      content,
      imagePath: filePath,
      UserId: req.user.id,
    });

    return res.status(201).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(401).send("피드를 추가할 수 없습니다.");
  }
});

router.get("/list", async (req, res, next) => {
  try {
    const feeds = await Feed.findAll({
      where: { isDelete: false },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
        },
      ],
    });

    return res.status(200).json(feeds);
  } catch (e) {
    console.error(e);
    return res.status(401).send("피드를 조회할 수 없습니다.");
  }
});

module.exports = router;

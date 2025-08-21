const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const verifyToken = require("../middlewares/authMiddleware");

router.get("/", bookController.getAllBooks);
router.get("/my", verifyToken, bookController.getMyBooks);
router.get("/:id", bookController.getBook);
router.post("/", verifyToken, bookController.createBook);
router.put("/:id", verifyToken, bookController.updateBook);
router.delete("/:id", verifyToken, bookController.deleteBook);

module.exports = router;

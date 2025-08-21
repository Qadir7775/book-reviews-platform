const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const verifyToken = require("../middlewares/authMiddleware");

router.post("/", verifyToken, reviewController.createReview);
router.get("/book/:bookId", reviewController.getReviewsForBook);
router.delete("/:id", verifyToken, reviewController.deleteReview);
router.put("/:id", verifyToken, reviewController.updateReview);

module.exports = router;


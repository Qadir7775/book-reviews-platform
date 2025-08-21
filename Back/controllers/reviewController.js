const Review = require("../models/Review");
const Book = require("../models/Book");


exports.getReviewsForBook = async (req, res) => {
    try {
        const reviews = await Review.find({ book: req.params.bookId }).populate("user", "username");
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.createReview = async (req, res) => {
    try {
        const { book, rating, comment } = req.body;

        const bookDoc = await Book.findById(book);
        if (!bookDoc) {
            return res.status(404).json({ message: "Kitab tapılmadı" });
        }
        if (bookDoc.createdBy.toString() === req.user.id) {
            return res.status(403).json({ message: "Öz kitabınıza rəy yaza bilməzsiniz" });
        }
        const review = await Review.create({
            user: req.user.id,
            book,
            rating,
            comment,
        });
        res.status(201).json(review);
    } catch (err) {
        console.error("Review create error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: "Review not found" });

        if (review.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Bu rəyə müdaxilə etmək icazəniz yoxdur" });
        }

        review.rating = req.body.rating || review.rating;
        review.comment = req.body.comment || review.comment;
        await review.save();

        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: "Review not found" });

        if (review.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Bu rəyə müdaxilə etmək icazəniz yoxdur" });
        }

        await review.remove();
        res.json({ message: "Review deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};


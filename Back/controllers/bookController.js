const Book = require("../models/Book");

exports.getBook = async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "book_not_found" });
    res.json(book);
};

exports.getMyBooks = async (req, res) => {
    try {
        const books = await Book.find({ createdBy: req.user.id });
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Xəta baş verdi" });
    }
};

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Xəta baş verdi" });
    }
};

exports.createBook = async (req, res) => {
    try {
        const booksData = req.body.map(book => ({
            ...book,
            createdBy: req.user.id
        }));

        const createdBooks = await Book.insertMany(booksData);
        res.status(201).json(createdBooks);
    } catch (error) {
        console.error("Kitab yaradılarkən xəta:", error.message);
        res.status(500).json({ message: "Kitab yaradılarkən xəta baş verdi", error: error.message });
    }
};


exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: "kitab_tapılmadı" });
        }

        if (book.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Bu əməliyyata icazə yoxdur" });
        }

        const { createdBy, ...updateData } = req.body;

        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: "Xəta baş verdi" });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Kitab tapılmadı" });
        }

        if (!req.user || book.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Bu əməliyyata icazə yoxdur" });
        }

        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Kitab silindi" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Xəta baş verdi" });
    }
};


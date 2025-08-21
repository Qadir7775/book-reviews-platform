require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

const PORT = process.env.PORT || 5001;

const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error("CORS blokladı: İcazəsiz origin"), false);
        }
    },
    credentials: true
}));

app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB qoşuldu");
        app.listen(PORT, () =>
            console.log(`🚀 Server ${PORT} portunda işə düşdü`)
        );
    })
    .catch((err) => console.error("❌ DB error:", err));

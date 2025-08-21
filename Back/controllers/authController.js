// controllers/authController.js
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPass });
        await newUser.save();

        res.status(201).json({ message: "user_registered" });
    } catch (err) {
        res.status(500).json({ message: "server_error", error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "invalid_email_or_password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "invalid_email_or_password" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "login_successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.username,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "server_error" });
    }
};

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token tapılmadı və ya düzgün deyil" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.id) {
            return res.status(401).json({ message: "Token düzgün deyil: ID tapılmadı" });
        }

        req.user = { id: decoded.id };
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token etibarsızdır" });
    }
};

module.exports = verifyToken;

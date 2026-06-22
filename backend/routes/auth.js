const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            msg: "Not Authorized"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({
            msg: "Invalid or Expired Token"
        });
    }
}

module.exports = auth;
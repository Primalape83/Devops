const router = require('express').Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function jwtauth(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            msg: "Not Authorized"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (decoded.role !== "Admin") {
            return res.status(403).json({
                msg: "Permission Denied"
            });
        }

        next();

    } catch (err) {
        return res.status(401).json({
            msg: "Invalid or Expired Token"
        });
    }
}

router.post('/', jwtauth, async (req, res) => {

    const { Fname, lname, email, password, role, phone } = req.body;

    try {

        const pass = await bcrypt.hash(password, 10);

        const result = await db.query(
            `INSERT INTO TaskFlowUsers
            (FirstName, LastName, Email, Password, Role, Phone)
            VALUES($1,$2,$3,$4,$5,$6)
            RETURNING *`,
            [Fname, lname, email, pass, role, phone]
        );

        const emp_id = result.rows[0].emp_id;

        await db.query(
            `INSERT INTO OTP(emp_id)
             VALUES($1)`,
            [emp_id]
        );

        return res.status(201).json({
            message: "User Registered Successfully"
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            message: "Error Registering User"
        });

    }

});

module.exports = router;
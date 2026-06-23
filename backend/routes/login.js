const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    const q = 'SELECT * FROM TaskFlowUsers WHERE email=$1';
    const { rows, rowCount } = await db.query(q, [email]);

    if (rowCount > 0) {
        const exist = await bcrypt.compare(password, rows[0].password); // ← also fixed typo: bycrypt → bcrypt
        if (exist) {
            const token = jwt.sign(
                {
                    emp_id: rows[0].emp_id,
                    email: rows[0].email,
                    role: rows[0].role
                },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '24h' }
            );
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000
            });
            return res.status(200).json({
                message: "Login Successful",
                role: rows[0].role
            });
        } else {
            return res.status(401).json({ message: 'Invalid password' });
        }
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;
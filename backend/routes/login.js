const router = require('express').Router()
const db = require('../db')
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res) => {
    const { email, password } = req.body
    const q = 'SELECT * FROM TaskFlowUsers WHERE email=$1'
    const { rows, rowCount } = (await db.query(q, [email]))
    if (rowCount > 0) {
        if (await bycrypt.compare(password, rows[0].password)) {
            const token = jwt.sign(
                {
                    email: rows[0].email,
                    role: rows[0].role
                },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '2h' }
            );
            res.status(200).json({ token: token, message: 'Login successful' })
        } else {
            res.status(401).json({ message: 'Invalid credentials' })
        }
    } else {
        res.status(401).json({ message: 'Invalid credentials' })
    }

})
module.exports = router
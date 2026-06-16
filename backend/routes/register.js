const router = require('express').Router()
const db = require('../db')
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
function jwtauth(req, res, next) {
    const header = req.headers.authorization
    try {
        if (header) {
            const token = header.split(' ')[1]
            const result = jwt.verify(token, process.env.JWT_SECRET_KEY)
            if (result.role != "Admin") {
                return res.json({ msg: "Permission denied" })
            }
            else if (result.role == "Admin") {
                next()
            }
        }
        else {
            return res.json({ msg: "NOT authorized" })
        }
    } catch (err) {
        return res.json({ msg: "Server Crash" })
    }
}
router.post('/', jwtauth, async (req, res) => {
    const { Fname, lname, email, password, role, phone } = req.body
    const pass = await bycrypt.hash(password, 10)
    try {

        const result = await db.query('INSERT INTO TaskFlowusers(FirstName,LastName,Email,Password,Role,phone) VALUES($1,$2,$3,$4,$5,$6) RETURNING *', [Fname, lname, email, pass, role, phone])
        if (result.rowCount > 0) {
            console.log(result)
            const emp_id = result.rows[0].emp_id;

            await db.query(
                "INSERT INTO OTP(emp_id) VALUES($1)",
                [emp_id]
            );

            res.status(200).json({ message: 'User registered successfully' })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error registering user' })
    }
})
module.exports = router;
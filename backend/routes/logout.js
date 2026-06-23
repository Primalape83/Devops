const router = require('express').Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

router.get('/', (req, res) => {

    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

    return res.status(200).json({
        msg: "Logged Out Successfully"
    });

});

module.exports = router;
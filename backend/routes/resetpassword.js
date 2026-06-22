const router = require('express').Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.Otp_mail,
        pass: process.env.pass
    }
});

// Send OTP
router.post('/sendotp', async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);

    try {
        const { rows, rowCount } = await db.query(
            "SELECT * FROM TaskFlowUsers WHERE email=$1",
            [email]
        );

        if (rowCount === 0) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        await db.query(
            "UPDATE OTP SET otp=$1, verified=FALSE WHERE emp_id=$2",
            [otp, rows[0].emp_id]
        );

        await transporter.sendMail({
            from: process.env.Otp_mail,
            to: email,
            subject: "OTP Verification",
            text: `Your OTP is ${otp}`
        });

        return res.status(200).json({
            msg: "OTP sent successfully"
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: "Server Error"
        });
    }
});

// Verify OTP
router.post('/verifyotp', async (req, res) => {
    const { email, otp } = req.body;

    try {

        const { rows, rowCount } = await db.query(
            `SELECT d.emp_id, o.otp
             FROM TaskFlowUsers d
             JOIN OTP o ON d.emp_id=o.emp_id
             WHERE d.email=$1`,
            [email]
        );

        if (rowCount === 0) {
            return res.status(404).json({
                msg: "No such email"
            });
        }

        if (Number(otp) === rows[0].otp) {

            await db.query(
                "UPDATE OTP SET verified=TRUE, otp=NULL WHERE emp_id=$1",
                [rows[0].emp_id]
            );

            return res.status(200).json({
                msg: "Verified"
            });
        }

        await db.query(
            "UPDATE OTP SET otp=NULL WHERE emp_id=$1",
            [rows[0].emp_id]
        );

        return res.status(400).json({
            msg: "Invalid OTP"
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            msg: "Server Error"
        });

    }
});

// Reset Password
router.post('/resetpassword', async (req, res) => {

    const { email, newpassword } = req.body;

    try {

        const { rows, rowCount } = await db.query(
            `SELECT d.emp_id, o.verified
             FROM TaskFlowUsers d
             JOIN OTP o ON d.emp_id=o.emp_id
             WHERE d.email=$1`,
            [email]
        );

        if (rowCount === 0) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        if (!rows[0].verified) {
            return res.status(403).json({
                msg: "OTP not verified"
            });
        }

        const hashed = await bcrypt.hash(newpassword, 10);

        await db.query(
            "UPDATE TaskFlowUsers SET password=$1 WHERE emp_id=$2",
            [hashed, rows[0].emp_id]
        );

        await db.query(
            "UPDATE OTP SET verified=FALSE WHERE emp_id=$1",
            [rows[0].emp_id]
        );

        return res.status(200).json({
            msg: "Password updated successfully"
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            msg: "Server Error"
        });

    }

});

module.exports = router;
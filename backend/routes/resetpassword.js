const express = require('express')
const db = require('../db')
const app = express()
require("dotenv").config()
const bycrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { on } = require('nodemailer/lib/xoauth2')
const transporter = nodemailer.createTransport(
    {
        service: "gmail",
        auth: {
            user: process.env.Otp_mail,
            pass: process.env.pass
        }
    }
)
const router=require('express').Router()
router.post('/sendotp', async (req, res) => {
    const { email } = req.body
    const otp = Math.floor(100000 + Math.random() * 900000)
    try {
        const q = 'SELECT * FROM TaskFlowusers WHERE email=$1'
        const { rows, rowCount } = await db.query(q, [email])
        if (rowCount > 0) {
            const r2 = await db.query(
                "UPDATE OTP SET otp=$1, verified=$2 WHERE emp_id=$3",
                [otp, false, rows[0].emp_id]
            )
            await transporter.sendMail({
                from: process.env.Otp_mail,
                to: email,
                subject: "Otp",
                text: `your otp is ${otp}`
            })
            return res.json({msg:"Otp recieved"})
        }
        if (rowCount === 0) {
            return res.status(404).json({ msg: "User not found" });
        }

    } catch (err) {
        res.json({ msg: "error" })
    }
})
app.post('/sendotp', async (req, res) => {
    const { email } = req.body
    const otp = Math.floor(100000 + Math.random() * 900000)
    try {
        const q = 'SELECT * FROM TaskFlowusers WHERE email=$1'
        const { rows, rowCount } = await db.query(q, [email])
        if (rowCount > 0) {
            const r2 = await db.query(
                "UPDATE OTP SET otp=$1, verified=$2 WHERE emp_id=$3",
                [otp, false, rows[0].emp_id]
            )
            await transporter.sendMail({
                from: process.env.Otp_mail,
                to: email,
                subject: "Otp",
                text: `your otp is ${otp}`
            })
            return res.json({msg:"Otp recieved"})
        }
        if (rowCount === 0) {
            return res.status(404).json({ msg: "User not found" });
        }

    } catch (err) {
        res.json({ msg: "error" })
    }
})
app.post('/verifyotp', async (req, res) => {
    const { email, otp } = req.body

    try {
        const q = `
            SELECT d.emp_id, O.Otp
            FROM TaskFlowusers d
            JOIN OTP O ON d.emp_id = O.emp_id
            WHERE d.email = $1`;
        const { rows, rowCount } = await db.query(q, [email])
        if (rowCount > 0) {
            if (otp == rows[0].otp) {
                await db.query(
                    "UPDATE OTP SET verified = TRUE, otp = NULL WHERE emp_id = $1",
                    [rows[0].emp_id]
                );
                res.json({ msg: "verified" })
            } else {
                await db.query(
                    "UPDATE OTP SET otp = NULL WHERE emp_id = $1",
                    [rows[0].emp_id]
                );
                res.status(400).json({
                    msg: "Wrong OTP. Please click Resend OTP."
                })
            }
        } else {
            res.status(404).json({
                msg: "No such email"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        })
    }
})
router.post('/verifyotp', async (req, res) => {
    const { email, otp } = req.body

    try {
        const q = `
            SELECT d.emp_id, O.Otp
            FROM TaskFlowusers d
            JOIN OTP O ON d.emp_id = O.emp_id
            WHERE d.email = $1`;
        const { rows, rowCount } = await db.query(q, [email])
        if (rowCount > 0) {
            if (otp == rows[0].otp) {
                await db.query(
                    "UPDATE OTP SET verified = TRUE, otp = NULL WHERE emp_id = $1",
                    [rows[0].emp_id]
                );
                res.json({ msg: "verified" })
            } else {
                await db.query(
                    "UPDATE OTP SET otp = NULL WHERE emp_id = $1",
                    [rows[0].emp_id]
                );
                res.status(400).json({
                    msg: "Wrong OTP. Please click Resend OTP."
                })
            }
        } else {
            res.status(404).json({
                msg: "No such email"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        })
    }
})
module.exports=router;
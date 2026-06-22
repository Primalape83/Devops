const express = require('express')
const db = require('./db')
const app = express()
require("dotenv").config()
const bycrypt = require('bcrypt')
const cookieParser = require('cookie-parser');
const registerRoute = require('./routes/register')
const jwt = require('jsonwebtoken')
const loginRoute = require('./routes/login')
const nodemailer = require('nodemailer')
const logoutroute=require('./routes/logout')
const forgotpasswordroute=require('./routes/resetpassword')
const getteams=require('./routes/getteams')

db.query('SELECT NOW()')
    .then(() => console.log('DB Connected'))
    .catch(err => console.error('DB Error:', err))
app.use(express.json())
app.use(cookieParser())
const path = require('path');
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

app.use('/register', registerRoute)
app.use('/login', loginRoute)
app.use('/logout',logoutroute)
app.use('/forgotpassword',forgotpasswordroute)
app.use('/getteams',getteams)

app.listen(2000, () => {
    console.log('listening on 2000')
})
// import express from 'express'
const express = require("express");
import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import logger,{morganMiddleware} from './logger'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth'
import { connectDB } from './utils/db.utils'


const app = express()
const PORT = process.env.PORT || 8080

connectDB()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(morganMiddleware)
app.use('/auth', authRoutes)

app.get('/', (req, res) =>{
    res.send(`Server is running `)
})

app.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    req.send("login sucessfull!!");
})
app.post('/signup',(req,res)=>{
    const email = req.body.email;
    const createPassword = req.body.createPassword;
    req.send("signup successfull!!");
})
app.about('/about',(req,res)=>{
    const about = req.body.about;
    req.sent("about generated.")
})

app.listen(PORT, () => {
    logger.info(`Server is listening on port ${PORT}`)
})
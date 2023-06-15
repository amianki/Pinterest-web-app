import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

import cors from 'cors'
import logger,{morganMiddleware} from './logger'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth'
import { connectDB } from './utils/db.utils'
import { transport } from 'winston'
import { Comment, User } from './db'


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
    console.log(email);
    res.send("login sucessfull!!");

})
app.post('/signup',(req,res)=>{
    const fName = req.body.fName;
    const lName = req.body.lName;
    const mail = req.body.mail;
    const createPassword = req.body.createPassword;
    const User = new mongoose.model("User", User);
    const user = new User({
        firstName: fName,
        lastName: lName,
        email: mail,
        password: createPassword
    });
    user.save().then(console.log).catch(console.error);
    res.send(mail + " " + createPassword);
})
app.post('/about',(req,res)=>{
    const about = req.body.about;

    res.send(about)
})
app.post('/Comment',(req,res)=>{
    const commentText= req.body.commentText;
    const User = req.body.User;
    const post = req.body.post;
    const likes = req.body.likes;
    const Comment = new mongoose.model("Comment", Comment);
    const comment = new Comment ({
        commentText:commentText,
        User:User,
        post:post,
        likes:likes
    });
    comment.save().then(console.log).catch(console.error);
    res.send(User + " " + commentText);
})

app.listen(PORT, () => {
    logger.info(`Server is listening on port ${PORT}`)
})


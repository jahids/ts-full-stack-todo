import { RequestHandler } from "express"
import bcrypt from 'bcrypt';
import UserModel from "../models/user";
import session, { SessionData } from 'express-session';

// express-session type declare
declare module 'express-session' {
    interface SessionData {
      userId: any;
    }
  }

 export const getaAuthenticatedUser : RequestHandler = async(req,res,next) => {
    const authenticatedUser = req.session.userId;
    try {
        if(!authenticatedUser){
          return res.json({msg : "user not authenticated"})
        }

        const user = await UserModel.findById({authenticatedUser}).select("+email").exec();
        res.status(200).json(user)
    } catch (error) {
        res.send("server problem");
        console.log(error);
    }

 }
 
 export const signUp : RequestHandler = async (req, res, next) => {
    const {username, email, password} = req.body;
    const saltRound = 10;
try {
   

    if(!username || !email || !password){
       return  res.json({message : "Parameters missing"})
    }
    const existingUserName = await UserModel.findOne({username}).exec();
    if(existingUserName){
         return res.json({message : "already user name exist"})
    }
    const existingEmail = await UserModel.findOne({email}).exec();
    if(existingEmail){
       return  res.json({message : "already email exist"})
    }

    const passwordHashed = await bcrypt.hash(password, saltRound);
  
    const newUser = await UserModel.create({
        username : username,
        email : email,
        password : passwordHashed
    })

 req.session.userId  = newUser._id


   return  res.json({
        message : "user create successfully",
        data : newUser
    })
} catch (error) {
    console.log(error);
   return  res.send("server error")
}

 }

  export const login : RequestHandler  = async (req, res) => {
 const {username, password} = req.body
    try {
        if(!username || !password){
            return res.send("parameter missing")
        }

        const user = await UserModel.findOne({username}).select("+password +email").exec();
        // res.send(user)

        if(!user){
            return res.send("invalid cred")
        }

        const passwoordMatch = await bcrypt.compare(password, user.password);
        if(!passwoordMatch){
            return res.send(" password wrong")
        }

        req.session.userId  = user._id

        return res.status(200).json({
            message : "successfully login",
            data : user
        })

    } catch (error) {
        console.log();
        
    }
 }
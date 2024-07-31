import { NextFunction, Request, Response } from "express"
import User from '../models/User.js'
import { hash, compare } from 'bcrypt'
import { createToken } from "../utils/token-manager.js"
import { COOKIE_NAME } from "../utils/constants.js"


export const getAllusers = async (req:Request, res: Response, next: NextFunction) => { 
    try {
        // this will get us all the users from database
        const users = await User.find()
        return res.status(201).json({message:"OK", users})
    } catch (error) {
        console.log(error)
        return res.status(200).json({message:"ERROR", cause: error.message})
    }
}

export const UserSignup = async (req:Request, res: Response, next: NextFunction) => { 
    try {
        // user signup
        const {name, email, password} = req.body // directly getting the following attributes from the request
        const existingUser = await User.findOne({email}) // we check if there is an existing email in the database
        if (existingUser)
        {
            // 401: Unauthorized error
            return res.status(401).send("Email already registered!")
        }
        const hashpassword = await hash(password, 10) // we hash the password
        const user = new User({name, email, password: hashpassword}) // we create a new instance of the user
        await user.save(); // to save the record in the database

        // creating and storing cookie on sign-up
        res.clearCookie(COOKIE_NAME, { // this will clear the cookie
            httpOnly: true,
            domain: 'localhost', 
            signed: true,
            path: '/'
        }) // to clear the cookie 

        const token = createToken(user._id.toString(), user.email, "7d") // this is the function we created in token-manager
        const expires = new Date();
        expires.setDate(expires.getDate() + 7) // we set the date to current date + 7 to set the expires date

        // now we have created the token using JWT. Next we need to send the token via http cookies

        res.cookie(COOKIE_NAME, token, { // to pass the cookie from the backend to frontend
            path:'/', // we will be storing cookies in the root directory
            domain: 'localhost', 
            expires, 
            httpOnly: true,
            signed: true, // we will the sign whole cookie as well
        }) 

        return res.status(200).json({message:"OK", name:user.name, email:user.email})
    } 
    catch (error) {
        console.log(error)
        return res.status(200).json({message:"ERROR", cause: error.message})
    }
}

export const UserLogin = async (req:Request, res: Response, next: NextFunction) => { 
    try {
        // user login
        const { email, password} = req.body // directly getting the following attributes from the request

        const user = await User.findOne({ email }) // we find the email of this user 
        if (!user) // if user does not exist in the database
        {
            return res.status(401).send("User is not registered!")
        }
        
        // we compare the passwords now. The first arg is the entered password, the second arg is the user.password which is the encrypted password
        const isPasswordCorrect = await compare(password, user.password)
        if (!isPasswordCorrect) // if password is not correct
        { // 403: incorrect password
            return res.status(403).send("Password is not correct!")
        }

        res.clearCookie(COOKIE_NAME, { // this will clear the cookie
            httpOnly: true,
            domain: 'localhost', 
            signed: true,
            path: '/'
        }) // to clear the cookie 

        const token = createToken(user._id.toString(), user.email, "7d") // this is the function we created in token-manager
        const expires = new Date();
        expires.setDate(expires.getDate() + 7) // we set the date to current date + 7 to set the expires date

        // now we have created the token using JWT. Next we need to send the token via http cookies

        res.cookie(COOKIE_NAME, token, { // to pass the cookie from the backend to frontend
            path:'/', // we will be storing cookies in the root directory
            domain: 'localhost', 
            expires, 
            httpOnly: true,
            signed: true, // we will the sign whole cookie as well
        }) 

        return res.status(201).json({message:"OK", name:user.name, email:user.email}) // after all checks are passed
    } 
    catch (error) {
        console.log(error)
        return res.status(200).json({message:"ERROR", cause: error.message})
    }
}

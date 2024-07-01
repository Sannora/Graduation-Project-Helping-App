const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')
const HttpError = require('../models/errorModel')

// Register
// POST: api/users/register
const registerUser = async (req,res,next) =>{
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password) {
            return next(new HttpError("Required fields are empty.", 422))
        }

        const newEmail = email.toLowerCase();

        const emailExists = await User.findOne({email: newEmail})
        if(emailExists) {
            return next(new HttpError("Email already exists.", 422))
        }

        if((password.trim()).length < 6) {
            return next(new HttpError("Password shorter than expected.", 422))
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = await User.create({username, email: newEmail, password: hashedPass})
        res.status(201).json(`New user ${newUser.email} registered.`)


    } catch (error) {
        return next(new HttpError("User failed to register.", 422))
    }
}

// Login
// POST: api/users/login
const loginUser = async (req,res,next) =>{
    try {
        const {email, password} = req.body;
        if(!email || !password ){
            return next(new HttpError("Fill in all fields.", 422))
        }
        const newEmail = email.toLowerCase();

        const user = await User.findOne({email: newEmail})
        if(!user) {
            return next(new HttpError("Invalid credentials.", 422))
        }

        const comparePass = await bcrypt.compare(password, user.password)
        if(!comparePass) {
            return next(new HttpError("Invalid credentials", 422))
        }

        const {_id: id, username} = user;
        const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: "1d"})

        res.status(200).json({token, id, username})
    } catch (error) {
        return next(new HttpError("Login failed.", 422))
    }
}

// Profile
// POST: api/users/:id
const getUser = async (req,res,next) =>{
   try {
    const {id} = req.params;
    const user = await User.findById(id).select('-password');
    if(!user) {
        return next(new HttpError("User not found.", 404))
    }
    res.status(200).json(user);
   } catch (error) {
        return next(new HttpError(error))
   }
}

module.exports = {registerUser, loginUser, getUser}
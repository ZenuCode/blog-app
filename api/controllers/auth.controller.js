import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";


// Signup checks for invalid email structures
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || 
        username === "" || email === "" || password === "") {
        next(errorHandler(400, "All fields are required"));
    }

    // Hash Encrypt PW
    const hashedPW = bcryptjs.hashSync(password, 10);
    
    // Create newUser object
    const newUser = new User({
        username,
        email,
        password: hashedPW,
    });

    try {
        await newUser.save();
        res.json("Signup success");
    } catch (error) {
        next(error);
    }
};
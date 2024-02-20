import User from '../models/userModel.js'
import express from 'express';
import bcryptjs from 'bcryptjs';
import asyncHandler from '../middleware/asyncHandler.js';
import createToken from '../utils/createToken.js';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save()
        res.status(201).json('User Created successfully')
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const signin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const isPasswordValid = await bcryptjs.compare(
            password,
            existingUser.password
        );

        if (isPasswordValid) {
            createToken(res, existingUser._id);

            res.status(201).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin,
            });
        } else {
            res.status(401).json({ message: "Invalid Password" });
        }
    } else {
        res.status(401).json({ message: "User not found" });
    }
});

export const logoutCurrentUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
      httyOnly: true,
      expires: new Date(0),
    });
  
    res.status(200).json({ message: "Logged out successfully" });
  });
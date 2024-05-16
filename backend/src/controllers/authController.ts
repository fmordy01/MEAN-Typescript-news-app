import { Request, Response } from 'express';
import { User } from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const {username, password} = req.body;

        if(!username || !password) {
            res.status(400).send('Username and password are required')
        }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({username: req.body.username, password: hashedPassword});
    
    await newUser.save();
    res.json(newUser);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal server error')
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const user = await User.findOne({username: req.body.username});
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET as string);
        res.json({token});
    } else {
        res.status(401).send('Invalid credentials');
    }
};
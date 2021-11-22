import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/userModel';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        
        if (!existingUser) return res.status(404).json({ message: 'User not found.' });

        const isPassword = bcrypt.compare(password, existingUser.password);

        if (!isPassword) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' });

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const signup = async (req, res) => {
    return null;
}
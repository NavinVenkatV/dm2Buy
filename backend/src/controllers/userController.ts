import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import { user } from "../models/shema";


//createUser
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userName, email, password } = req.body;
        const existingUser = await user.findOne({ email })
        if (existingUser) {
            res.status(400).json({ message: "User already exists!" })
            return;
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await user.create({
            userName,
            email,
            password: hashPassword
        })
        res.json({ message: "User registered successfully!!", id: newUser.id })
        return;
    } catch (e) {
        res.status(500).json({ message: 'Error registering user', e });
    }
}

//login
export const loginUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { email, password } = req.body;
        const findUser = await user.findOne({ email })
        if (!findUser) {
            res.status(404).json({ message: "User doesn't exists!" })
            return;
        }
        //compare password
        const hashPassword = await bcrypt.compare(password, findUser.password)
        if (!hashPassword) {
            res.status(400).json({ message: "Invalid password!" })
            return;
        }
        //token
        const token = jwt.sign({ userId: findUser.id }, process.env.JWT_SECRET!)
        res.json({ message: "LoggedIn successfully!", token: token })
        return;
    } catch (e) {
        res.status(500).json({ message: 'Error logging in user', e });
    }
}

//abtUser
export const getUser = async (req: Request, res: Response) : Promise<void> => {
  try {
    const userDetail = await user.findById(req.userId);
    if (!userDetail) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(userDetail);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

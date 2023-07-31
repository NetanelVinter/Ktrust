import {  RequestHandler } from "express";
import createHttpError from "http-errors";
import userModel from "../models/user";
import bcrypt from "bcrypt";
import "dotenv/config";



interface SignUpBody {
    username?: string,
    email?: string,
    password?: string
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody> = async (req, res, next) => {
    const usernameBody = req.body.username;
    const emailBody = req.body.email;
    const passwordRaw = req.body.password;

    try {

        if (!usernameBody || !emailBody || !passwordRaw)
            throw createHttpError(401, "parameters missing");

        const existUsername = await userModel.findOne({ username: usernameBody }).exec();

        if (existUsername)
            throw createHttpError(409, "username already exists, Please choose another username.");

        const existEmail = await userModel.findOne({ email: emailBody }).exec();

        if (existEmail)
            throw createHttpError(409, "email already exists, Please choose another email.");


        const passwordHash = await bcrypt.hash(passwordRaw!.toString(), 10);



        const newUser = await userModel.create({
            username: usernameBody,
            email: emailBody,
            password: passwordHash
        });

        req.session.userId = newUser._id;

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
}



interface LoginBody {
    username?: string,
    password?: string,
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if (!username || !password) {
            throw createHttpError(400, "Parameters missing");
        }

        const user = await userModel.findOne({ username: username }).select("+password +email").exec();

        if (!user) {
            throw createHttpError(401, "Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(password.toString(), user.password.toString());

        if (!passwordMatch) {
            throw createHttpError(401, "Invalid credentials");
        }

        req.session.userId = user._id;        
        res.status(201).json(user);
        
    } catch (error) {
        next(error);
    }
};









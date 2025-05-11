"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.loginUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const shema_1 = require("../models/shema");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectString = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(process.env.MONGO_URL);
        const conn = yield mongoose_1.default.connect(process.env.MONGO_URL);
        console.log('connected to mongo string!');
    }
    catch (e) {
        console.log("error connecting mongo string", e);
    }
});
connectString();
//createUser
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password } = req.body;
        const existingUser = yield shema_1.user.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists!" });
            return;
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield shema_1.user.create({
            userName,
            email,
            password: hashPassword
        });
        res.json({ message: "User registered successfully!!", id: newUser.id });
        return;
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Error registering user', e });
    }
});
exports.createUser = createUser;
//login
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const findUser = yield shema_1.user.findOne({ email });
        if (!findUser) {
            res.status(404).json({ message: "User doesn't exists!" });
            return;
        }
        //compare password
        const hashPassword = yield bcrypt_1.default.compare(password, findUser.password);
        if (!hashPassword) {
            res.status(400).json({ message: "Invalid password!" });
            return;
        }
        //token
        const token = jsonwebtoken_1.default.sign({ userId: findUser.id }, process.env.JWT_SECRET);
        res.json({ message: "LoggedIn successfully!", token: token });
        return;
    }
    catch (e) {
        res.status(500).json({ message: 'Error logging in user', e });
    }
});
exports.loginUser = loginUser;
//abtUser
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDetail = yield shema_1.user.findById(req.userId);
        if (!userDetail) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(userDetail);
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
});
exports.getUser = getUser;

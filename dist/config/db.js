"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb+srv://Aksheg:Application123@cluster0.zglxubu.mongodb.net/movie';
const connect = async () => {
    try {
        await mongoose_1.default.connect(DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.connect = connect;

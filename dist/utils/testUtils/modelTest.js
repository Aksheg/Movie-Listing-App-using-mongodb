"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../../model/userModel"));
const testUtils_1 = require("./testUtils");
const globals_1 = require("@jest/globals");
const globals_2 = require("@jest/globals");
(0, globals_1.beforeAll)(async () => await (0, testUtils_1.dbConnect)());
(0, globals_1.afterAll)(async () => await (0, testUtils_1.dbDisconnect)());
(0, globals_1.describe)("User Model Test Suite", () => {
    (0, globals_1.test)("should create a User data successfully", async () => {
        const UserData = {
            email: "segun@gmail.com",
            firstName: "Segun",
            userName: "Shegs",
            password: "1234",
        };
        const newUserData = new userModel_1.default(UserData);
        await newUserData.save();
        (0, globals_2.expect)(newUserData._id).toBeDefined();
        (0, globals_2.expect)(newUserData.email).toBe(UserData.email);
        (0, globals_2.expect)(newUserData.firstName).toBe(UserData.firstName);
        (0, globals_2.expect)(newUserData.userName).toBe(UserData.userName);
        (0, globals_2.expect)(newUserData.password).toBe(UserData.password);
    });
    (0, globals_1.test)("should fail for User data without required fields", async () => {
        const invalidUserData = {
            email: "segun@gmail.com",
            firstName: "Segun",
            userName: "Shegs",
            password: "1234",
        };
        try {
            const newUserData = new userModel_1.default(invalidUserData);
            await newUserData.save();
        }
        catch (error) {
            const err = error;
            (0, globals_2.expect)(err.errors.firstName).toBeDefined();
        }
    });
    (0, globals_1.test)("should fail for User data without required fields", async () => {
        const invalidUserData = {
            email: "segun@gmail.com",
            firstName: "Segun",
            userName: "Shegs",
            password: "1234",
        };
        try {
            const newUserData = new userModel_1.default(invalidUserData);
            await newUserData.save();
        }
        catch (error) {
            const err = error;
            (0, globals_2.expect)(err.errors.email).toBeDefined();
        }
    });
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_controller_1 = __importDefault(require("./auth.controller"));
var otp_controller_1 = __importDefault(require("./otp.controller"));
var user_controller_1 = __importDefault(require("./user.controller"));
exports.default = {
    authController: auth_controller_1.default,
    otpController: otp_controller_1.default,
    userController: user_controller_1.default
};

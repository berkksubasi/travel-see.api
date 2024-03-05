"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPModel = exports.UserModel = void 0;
var user_model_1 = require("./user.model");
Object.defineProperty(exports, "UserModel", { enumerable: true, get: function () { return __importDefault(user_model_1).default; } });
var otp_model_1 = require("./otp.model");
Object.defineProperty(exports, "OTPModel", { enumerable: true, get: function () { return __importDefault(otp_model_1).default; } });

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_util_1 = __importDefault(require("./auth.util"));
var mail_util_1 = __importDefault(require("./mail.util"));
exports.default = {
    authUtils: auth_util_1.default,
    mailUtil: mail_util_1.default
};

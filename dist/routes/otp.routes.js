"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Libs.
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var controllers_1 = __importDefault(require("../controllers"));
router.post('/verify/email', controllers_1.default.otpController.sendEmailVerifyOTP);
router.post('/reset/password', controllers_1.default.otpController.sendResetPasswordOTP);
exports.default = router;

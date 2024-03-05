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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var otp_generator_1 = __importDefault(require("otp-generator"));
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var models_1 = require("../models");
var data_access_1 = __importDefault(require("../data-access"));
var sendEmailVerifyOTP = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, username, existingUserEmail, existingUserUsername, checkUserPresent, otp, result, otpPayload, otpBody, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 9, , 10]);
                _a = req.body, email = _a.email, username = _a.username;
                console.log(" req.body;", req.body);
                return [4 /*yield*/, data_access_1.default.userDataAccess.getUser({ email: email })];
            case 1:
                existingUserEmail = _b.sent();
                return [4 /*yield*/, data_access_1.default.userDataAccess.getUser({ username: username })];
            case 2:
                existingUserUsername = _b.sent();
                console.log("existingUserEmail", existingUserEmail);
                if (existingUserEmail && (existingUserEmail === null || existingUserEmail === void 0 ? void 0 : existingUserEmail.length) > 0) {
                    return [2 /*return*/, res.status(http_status_codes_1.default.BAD_REQUEST).json({
                            success: false,
                            // @todo get from message constants 
                            message: 'User already registered with that email',
                        })];
                }
                if (existingUserUsername && (existingUserUsername === null || existingUserUsername === void 0 ? void 0 : existingUserUsername.length) > 0) {
                    return [2 /*return*/, res.status(http_status_codes_1.default.BAD_REQUEST).json({
                            success: false,
                            // @todo get from message constants 
                            message: 'User already registered with that username',
                        })];
                }
                return [4 /*yield*/, models_1.UserModel.findOne({ email: email })];
            case 3:
                checkUserPresent = _b.sent();
                // If user found with provided email
                if (checkUserPresent) {
                    return [2 /*return*/, res.status(401).json({
                            success: false,
                            message: 'User is already registered',
                        })];
                }
                otp = otp_generator_1.default.generate(4, {
                    upperCaseAlphabets: false,
                    lowerCaseAlphabets: false,
                    specialChars: false,
                });
                return [4 /*yield*/, models_1.OTPModel.findOne({ otp: otp })];
            case 4:
                result = _b.sent();
                _b.label = 5;
            case 5:
                if (!result) return [3 /*break*/, 7];
                otp = otp_generator_1.default.generate(4, {
                    upperCaseAlphabets: false,
                });
                return [4 /*yield*/, models_1.OTPModel.findOne({ otp: otp })];
            case 6:
                result = _b.sent();
                return [3 /*break*/, 5];
            case 7:
                otpPayload = { email: email, otp: otp, type: 'verify-email' };
                return [4 /*yield*/, models_1.OTPModel.create(otpPayload)];
            case 8:
                otpBody = _b.sent();
                res.status(200).json({
                    success: true,
                    message: 'OTP sent successfully',
                    otp: otp,
                });
                return [3 /*break*/, 10];
            case 9:
                error_1 = _b.sent();
                console.log(error_1.message);
                return [2 /*return*/, res.status(500).json({ success: false, error: error_1.message })];
            case 10: return [2 /*return*/];
        }
    });
}); };
var sendResetPasswordOTP = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, checkUserPresent, otp, result, otpPayload, otpBody, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                email = req.body.email;
                return [4 /*yield*/, models_1.UserModel.findOne({ email: email })];
            case 1:
                checkUserPresent = _a.sent();
                // If user not found with provided email
                if (!checkUserPresent) {
                    return [2 /*return*/, res.status(401).json({
                            success: false,
                            message: 'User is not registered',
                        })];
                }
                otp = otp_generator_1.default.generate(4, {
                    upperCaseAlphabets: false,
                    lowerCaseAlphabets: false,
                    specialChars: false,
                });
                return [4 /*yield*/, models_1.OTPModel.findOne({ otp: otp })];
            case 2:
                result = _a.sent();
                _a.label = 3;
            case 3:
                if (!result) return [3 /*break*/, 5];
                otp = otp_generator_1.default.generate(4, {
                    upperCaseAlphabets: false,
                });
                return [4 /*yield*/, models_1.OTPModel.findOne({ otp: otp })];
            case 4:
                result = _a.sent();
                return [3 /*break*/, 3];
            case 5:
                otpPayload = { email: email, otp: otp, type: 'reset-password' };
                return [4 /*yield*/, models_1.OTPModel.create(otpPayload)];
            case 6:
                otpBody = _a.sent();
                res.status(200).json({
                    success: true,
                    message: 'OTP sent successfully',
                    otp: otp,
                });
                return [3 /*break*/, 8];
            case 7:
                error_2 = _a.sent();
                console.log(error_2.message);
                return [2 /*return*/, res.status(500).json({ success: false, error: error_2.message })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.default = { sendEmailVerifyOTP: sendEmailVerifyOTP, sendResetPasswordOTP: sendResetPasswordOTP };

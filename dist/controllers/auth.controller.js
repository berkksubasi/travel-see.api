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
var jsonwebtoken_1 = require("jsonwebtoken");
var http_status_codes_1 = require("http-status-codes");
var data_access_1 = __importDefault(require("../data-access"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var utils_1 = __importDefault(require("../utils"));
var models_1 = require("../models");
// RESET_PASSWORD_CONTROLLER
var resetPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, otp, response, salt, hashedPass, users, user, updatedUser, error_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 7, , 8]);
                _a = req.body, email = _a.email, password = _a.password, otp = _a.otp;
                return [4 /*yield*/, models_1.OTPModel.find({ email: email, type: "reset-password" }).sort({ createdAt: -1 }).limit(1)];
            case 1:
                response = _c.sent();
                if (response.length === 0 || otp !== ((_b = response[0]) === null || _b === void 0 ? void 0 : _b.otp)) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: 'The OTP is not valid',
                        })];
                }
                return [4 /*yield*/, bcrypt_1.default.genSalt(+(process.env.SALT_ROUNDS || 10))];
            case 2:
                salt = _c.sent();
                return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
            case 3:
                hashedPass = _c.sent();
                return [4 /*yield*/, data_access_1.default.userDataAccess.getUser({ identifier: email })];
            case 4:
                users = _c.sent();
                if (!users) return [3 /*break*/, 6];
                user = users.pop();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: 'User not found',
                        })];
                }
                user.password = hashedPass;
                return [4 /*yield*/, data_access_1.default.userDataAccess.updateUser(user._id, user)];
            case 5:
                updatedUser = _c.sent();
                console.log("updatedUser", updatedUser);
                res.status(200).json({
                    success: true,
                    message: 'Password reset successfully',
                });
                _c.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_1 = _c.sent();
                console.log(error_1.message);
                return [2 /*return*/, res.status(500).json({ success: false, error: error_1.message })];
            case 8: return [2 /*return*/];
        }
    });
}); };
//REGISTER_CONTROLLER
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, phone, password, otp, salt, hashedPass, tempUser, response, createdUser, accessToken, error_2;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 5, , 6]);
                _a = req.body, username = _a.username, email = _a.email, phone = _a.phone, password = _a.password, otp = _a.otp;
                return [4 /*yield*/, bcrypt_1.default.genSalt(+(process.env.SALT_ROUNDS || 10))];
            case 1:
                salt = _c.sent();
                return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
            case 2:
                hashedPass = _c.sent();
                tempUser = {
                    username: username,
                    email: email,
                    phone: phone,
                    password: hashedPass
                };
                return [4 /*yield*/, models_1.OTPModel.find({ email: email }).sort({ createdAt: -1 }).limit(1)];
            case 3:
                response = _c.sent();
                if (response.length === 0 || otp !== ((_b = response[0]) === null || _b === void 0 ? void 0 : _b.otp)) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: 'The OTP is not valid',
                        })];
                }
                return [4 /*yield*/, data_access_1.default.userDataAccess.createUser(tempUser)];
            case 4:
                createdUser = _c.sent();
                accessToken = utils_1.default.authUtils.generateJWT(createdUser);
                res.status(http_status_codes_1.StatusCodes.CREATED).json(accessToken);
                return [3 /*break*/, 6];
            case 5:
                error_2 = _c.sent();
                console.log("----- Error Cacthed When trying to create user -----", error_2);
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(error_2.message);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
//LOGIN_CONTROLLER
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, identifier, password, existingUsers, existingUser, _b, accessToken, error_3;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 5, , 6]);
                _a = req.body, identifier = _a.identifier, password = _a.password;
                return [4 /*yield*/, data_access_1.default.userDataAccess.getUser({ identifier: identifier === null || identifier === void 0 ? void 0 : identifier.toLowerCase() })];
            case 1:
                existingUsers = _c.sent();
                console.log(" identifier, password ", existingUsers, identifier, password);
                if (!existingUsers) return [3 /*break*/, 4];
                existingUser = existingUsers.pop();
                _b = !existingUser;
                if (_b) return [3 /*break*/, 3];
                return [4 /*yield*/, bcrypt_1.default.compare(password, existingUser.password)];
            case 2:
                _b = !(_c.sent());
                _c.label = 3;
            case 3:
                if (_b) {
                    return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send("Invalid username or password!")];
                }
                existingUser.password = "";
                accessToken = utils_1.default.authUtils.generateJWT(existingUser);
                return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json(accessToken)];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_3 = _c.sent();
                console.log("----- Error Caught when user tries to log in -----", error_3);
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send(error_3.message);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var isAuth = function (req, res) {
    var authHeader = req.get("Authorization");
    if (!authHeader) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: 'not authenticated' });
    }
    ;
    var token = authHeader.split(' ')[1];
    var decodedToken;
    try {
        decodedToken = jsonwebtoken_1.jwt.verify(token, 'secret');
    }
    catch (err) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message || 'could not decode the token' });
    }
    ;
    if (!decodedToken) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: 'unauthorized' });
    }
    else {
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'here is your resource' });
    }
    ;
};
exports.default = {
    resetPassword: resetPassword,
    register: register,
    login: login
};

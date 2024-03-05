"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var http_status_codes_1 = require("http-status-codes");
var data_access_1 = __importDefault(require("../data-access/"));
var utils_1 = __importDefault(require("../utils"));
var getUserDetails = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, users, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                return [4 /*yield*/, data_access_1.default.userDataAccess.getUser({ _id: userId })];
            case 1:
                users = _a.sent();
                if (users === null || users === void 0 ? void 0 : users.length) {
                    user = users === null || users === void 0 ? void 0 : users.pop();
                    user === null || user === void 0 ? true : delete user.password;
                    return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json(user)];
                }
                return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                        success: false,
                        message: "User not found"
                    })];
        }
    });
}); };
var getUserDetailsWithToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tokenInfo, userId, users, user;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                tokenInfo = utils_1.default.authUtils.getJWTInfo(((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || "");
                if (!tokenInfo) return [3 /*break*/, 2];
                userId = tokenInfo._id;
                return [4 /*yield*/, data_access_1.default.userDataAccess.getUser({ _id: userId })];
            case 1:
                users = _b.sent();
                if (users === null || users === void 0 ? void 0 : users.length) {
                    user = users === null || users === void 0 ? void 0 : users.pop();
                    user === null || user === void 0 ? true : delete user.password;
                    if (user) {
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json(user)];
                    }
                }
                return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                        success: false,
                        message: "User not found"
                    })];
            case 2: return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    success: false,
                    message: "User not found"
                })];
        }
    });
}); };
var updateContactInformations = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tokenInfo, userId, users, user, contactInformations, tempUser, updatedUser;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                tokenInfo = utils_1.default.authUtils.getJWTInfo(((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || "");
                if (!tokenInfo) return [3 /*break*/, 4];
                userId = tokenInfo._id;
                return [4 /*yield*/, data_access_1.default.userDataAccess.getUser({ _id: userId })];
            case 1:
                users = _b.sent();
                if (!(users === null || users === void 0 ? void 0 : users.length)) return [3 /*break*/, 3];
                user = users === null || users === void 0 ? void 0 : users.pop();
                user === null || user === void 0 ? true : delete user.password;
                if (!user) return [3 /*break*/, 3];
                contactInformations = req.body;
                tempUser = __assign(__assign({}, user), { contactInformations: contactInformations });
                return [4 /*yield*/, data_access_1.default.userDataAccess.updateUser(user._id, tempUser)];
            case 2:
                updatedUser = _b.sent();
                return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json(updatedUser)];
            case 3: return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    success: false,
                    message: "User contact infos could not updated!"
                })];
            case 4: return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                    success: false,
                    message: "User not authorized!"
                })];
        }
    });
}); };
var updatePersonalInformations = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tokenInfo, userId, users, user, personalInformations, tempUser, updatedUser;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                tokenInfo = utils_1.default.authUtils.getJWTInfo(((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || "");
                if (!tokenInfo) return [3 /*break*/, 4];
                userId = tokenInfo._id;
                return [4 /*yield*/, data_access_1.default.userDataAccess.getUser({ _id: userId })];
            case 1:
                users = _b.sent();
                if (!(users === null || users === void 0 ? void 0 : users.length)) return [3 /*break*/, 3];
                user = users === null || users === void 0 ? void 0 : users.pop();
                user === null || user === void 0 ? true : delete user.password;
                if (!user) return [3 /*break*/, 3];
                personalInformations = req.body;
                tempUser = __assign(__assign({}, user), { personalInformations: personalInformations });
                return [4 /*yield*/, data_access_1.default.userDataAccess.updateUser(user._id, tempUser)];
            case 2:
                updatedUser = _b.sent();
                return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json(updatedUser)];
            case 3: return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    success: false,
                    message: "User updatePersonalInformations infos could not updated!"
                })];
            case 4: return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                    success: false,
                    message: "User not authorized!"
                })];
        }
    });
}); };
var updateAddressInformations = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tokenInfo, userId, users, user, addressInformations, tempUser, updatedUser;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                tokenInfo = utils_1.default.authUtils.getJWTInfo(((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || "");
                if (!tokenInfo) return [3 /*break*/, 4];
                userId = tokenInfo._id;
                return [4 /*yield*/, data_access_1.default.userDataAccess.getUser({ _id: userId })];
            case 1:
                users = _b.sent();
                if (!(users === null || users === void 0 ? void 0 : users.length)) return [3 /*break*/, 3];
                user = users === null || users === void 0 ? void 0 : users.pop();
                user === null || user === void 0 ? true : delete user.password;
                if (!user) return [3 /*break*/, 3];
                addressInformations = req.body;
                console.log("addressInformations", addressInformations);
                tempUser = __assign(__assign({}, user), { addressInformations: addressInformations });
                return [4 /*yield*/, data_access_1.default.userDataAccess.updateUser(user._id, tempUser)];
            case 2:
                updatedUser = _b.sent();
                return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json(updatedUser)];
            case 3: return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    success: false,
                    message: "User updatePersonalInformations infos could not updated!"
                })];
            case 4: return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    success: false,
                    message: "User updateAddressInformations infos could not updated!"
                })];
        }
    });
}); };
// 
// 
exports.default = {
    getUserDetails: getUserDetails,
    getUserDetailsWithToken: getUserDetailsWithToken,
    updateContactInformations: updateContactInformations,
    updatePersonalInformations: updatePersonalInformations,
    updateAddressInformations: updateAddressInformations,
};

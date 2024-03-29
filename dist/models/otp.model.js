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
var mongoose_1 = __importDefault(require("mongoose"));
var utils_1 = __importDefault(require("../utils"));
var otpSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["verify-email", "reset-password"],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 2, // The document will be automatically deleted after 5 minutes of its creation time
    },
});
// Define a function to send emails
function sendVerificationEmail(email, otp) {
    return __awaiter(this, void 0, void 0, function () {
        var mailResponse, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, utils_1.default.mailUtil.mailSender(email, "Verification Email", "<h1>Please confirm your OTP</h1>\n       <p>Here is your OTP code: ".concat(otp, "</p>"))];
                case 1:
                    mailResponse = _a.sent();
                    console.log("Email sent successfully: ", mailResponse);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log("Error occurred while sending email: ", error_1);
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function sendResetPasswordEmail(email, otp) {
    return __awaiter(this, void 0, void 0, function () {
        var mailResponse, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, utils_1.default.mailUtil.mailSender(email, "Reset Password", "<h1>Please confirm your OTP</h1>\n       <p>Here is your OTP code: ".concat(otp, "</p>"))];
                case 1:
                    mailResponse = _a.sent();
                    console.log("Email sent successfully: ", mailResponse);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log("Error occurred while sending email: ", error_2);
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
otpSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("New OTP document saved to the database");
                    if (!this.isNew) return [3 /*break*/, 4];
                    if (!(this.type === "reset-password")) return [3 /*break*/, 2];
                    return [4 /*yield*/, sendResetPasswordEmail(this.email, this.otp)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    if (!(this.type === "verify-email")) return [3 /*break*/, 4];
                    return [4 /*yield*/, sendVerificationEmail(this.email, this.otp)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    next();
                    return [2 /*return*/];
            }
        });
    });
});
var OTPModel = mongoose_1.default.model("OTP", otpSchema);
exports.default = OTPModel;

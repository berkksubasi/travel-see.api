"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// Routes.
var auth_routes_1 = __importDefault(require("./auth.routes"));
var user_routes_1 = __importDefault(require("./user.routes"));
var otp_routes_1 = __importDefault(require("./otp.routes"));
var router = express_1.default.Router();
router.get('/', function (req, res) {
    res.send('Hello world!');
});
router.use('/auth', auth_routes_1.default);
router.use('/user', user_routes_1.default);
router.use('/otp', otp_routes_1.default);
exports.default = router;

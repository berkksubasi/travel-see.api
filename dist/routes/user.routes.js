"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var controllers_1 = __importDefault(require("../controllers"));
// CRUD 
// get post patch put delete 
// Create User - Register
// Get User - Get Single User - Get User By ID - User 
router.get("/:userId", controllers_1.default.userController.getUserDetails);
router.get("/", controllers_1.default.userController.getUserDetailsWithToken);
// Get All Users - Get All Users - User[]
// Update User - Edit Profile || Change Password 
router.patch("/update/contactInformations", controllers_1.default.userController.updateContactInformations);
router.patch("/update/personalInformations", controllers_1.default.userController.updatePersonalInformations);
router.patch("/update/addressInformations", controllers_1.default.userController.updateAddressInformations);
// Delete User 
exports.default = router;

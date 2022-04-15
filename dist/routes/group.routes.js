"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const router = (0, express_1.Router)();
const group_controller_1 = require("../controllers/group.controller");
const verifyAuth_1 = tslib_1.__importDefault(require("../middleware/verifyAuth"));
router.post("/create", verifyAuth_1.default, group_controller_1.createGroup);
router.post("/invite", verifyAuth_1.default, group_controller_1.addUser);
router.get("/get", verifyAuth_1.default, group_controller_1.getGroups);
router.post("/remove", verifyAuth_1.default, group_controller_1.removeUser);
router.post("/make-admin", verifyAuth_1.default, group_controller_1.makeAdmin);
router.post("/addchat", verifyAuth_1.default, group_controller_1.addChat);
exports.default = router;
//# sourceMappingURL=group.routes.js.map
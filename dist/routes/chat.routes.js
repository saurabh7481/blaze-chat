"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const router = (0, express_1.Router)();
const os_1 = tslib_1.__importDefault(require("os"));
const multer_1 = tslib_1.__importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: os_1.default.tmpdir() });
const verifyAuth_1 = tslib_1.__importDefault(require("../middleware/verifyAuth"));
const chat_controller_1 = require("../controllers/chat.controller");
router.get("/get", verifyAuth_1.default, chat_controller_1.getChats);
router.post("/send", verifyAuth_1.default, chat_controller_1.addChat);
router.post("/upload", verifyAuth_1.default, upload.single("file"), chat_controller_1.uploadFile);
exports.default = router;
//# sourceMappingURL=chat.routes.js.map
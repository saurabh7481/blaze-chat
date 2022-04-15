"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const router = (0, express_1.Router)();
const checkUserDetals_1 = tslib_1.__importDefault(require("../middleware/checkUserDetals"));
const auth_controller_1 = require("../controllers/auth.controller");
router.post("/signup", checkUserDetals_1.default, auth_controller_1.signUp);
router.post("/login", auth_controller_1.login);
// router.get("/logout", logout);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map
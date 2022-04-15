"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const config = process.env;
const models_1 = require("../models");
const verifyAuth = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const auth = req.cookies;
    if (!auth.token) {
        return res.status(403).send("Unauthorized");
    }
    try {
        const decode = jsonwebtoken_1.default.verify(auth.token, config.JWT_SECRET);
        const user = yield models_1.User.findByPk(decode.id);
        if (user)
            req.user = user;
    }
    catch (err) {
        console.log(err);
        return res.status(401).send("Invalid Authorization");
    }
    return next();
});
exports.default = verifyAuth;
//# sourceMappingURL=verifyAuth.js.map
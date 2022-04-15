"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const models_1 = require("../models");
const checkUserDetails = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    try {
        let user = yield models_1.User.findOne({
            where: {
                email: userData.email
            }
        });
        if (user) {
            return res.status(400).json({
                message: "Email is taken, try something else!"
            });
        }
        return next();
    }
    catch (error) {
        return res.status(500).json({
            message: "Oops! Something went wrong. Try again later"
        });
    }
});
exports.default = checkUserDetails;
//# sourceMappingURL=checkUserDetals.js.map
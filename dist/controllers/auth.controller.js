"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signUp = void 0;
const tslib_1 = require("tslib");
const models_1 = require("../models");
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const signUp = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    try {
        const user = yield models_1.User.create({
            name: userData.name,
            email: userData.email,
            phnumber: userData.phnumber,
            password: bcryptjs_1.default.hashSync(userData.password, 8),
        });
        if (user) {
            const date = new Date();
            date.setTime(date.getTime() + (3 * 24 * 60 * 60 * 1000));
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET);
            res.cookie("token", token, {
                httpOnly: true,
                expires: date
            });
            return res.status(200).json({ success: true, message: "Registered!" });
        }
        else {
            return res.json({ success: false, message: "Server error" });
        }
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
});
exports.signUp = signUp;
const login = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const user = yield models_1.User.findOne({
            where: {
                email: userData.email
            }
        });
        if (!user)
            return res.status(404).json({ error: "User does not exists" });
        const validPass = yield bcryptjs_1.default.compare(userData.password, user.password);
        if (!validPass)
            return res.status(401).json({ error: "Invalid Credentials" });
        const date = new Date();
        date.setTime(date.getTime() + (3 * 24 * 60 * 60 * 1000));
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
            expires: date
        });
        const { name, email } = user;
        return res.status(200).json({ token, user: { name, email } });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: err });
    }
});
exports.login = login;
//# sourceMappingURL=auth.controller.js.map
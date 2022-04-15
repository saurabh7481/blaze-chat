"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addChat = exports.makeAdmin = exports.removeUser = exports.addUser = exports.getGroups = exports.createGroup = void 0;
const tslib_1 = require("tslib");
// @ts-nocheck
const models_1 = require("../models");
// interface CreateRequestBody {
//     name: string,
//     adminId: number
// }
// interface AddRequestBody {
//     email: string
// }
// interface RequestExtended extends Request{
//     user? : typeof User
// }
const createGroup = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        // const body = req.body as CreateRequestBody;
        const group = yield models_1.Group.create({
            name: req.body.name
        });
        if (group) {
            group.addUser(yield models_1.User.findByPk(req.user.id), { through: { isAdmin: true } });
            return res.status(200).json({ success: true, message: "Group created" });
        }
        else {
            return res.status(401).json({ success: false, message: "Something went wrong" });
        }
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.createGroup = createGroup;
const getGroups = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const groups = [];
        const groupusers = yield models_1.GroupUser.findAll({
            where: {
                userId: req.user.id
            }
        });
        yield Promise.all(groupusers.map((groupuser) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const group = yield models_1.Group.findByPk(groupuser.groupId);
            groups.push({
                id: group.id,
                name: group.name
            });
            console.log("Inside: ", groups);
        })));
        console.log("outside: ", groups);
        return res.status(200).json({ success: true, groups: groups });
    }
    catch (err) {
        return res.status(500).json({ success: false, err: err });
    }
});
exports.getGroups = getGroups;
const addUser = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        // const body = req.body as AddRequestBody;
        const user = yield models_1.User.findOne({
            where: {
                email: req.body.email
            }
        });
        const group = yield models_1.Group.findByPk(req.body.groupid);
        const added = yield group.addUser(user);
        return res.status(200).json({ success: true, message: "User added" });
    }
    catch (err) {
        return res.status(500).json({ success: false, err: err });
    }
});
exports.addUser = addUser;
const removeUser = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.findOne({
            where: {
                email: req.body.email
            }
        });
        const group = yield models_1.Group.findByPk(req.body.groupid);
        yield group.removeUser(user);
        return res.status(200).json({ success: true, message: "User removed" });
    }
    catch (err) {
        return res.status(500).json({ success: false, err: err });
    }
});
exports.removeUser = removeUser;
const makeAdmin = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.findOne({
            where: {
                email: req.body.email
            }
        });
        const group = yield models_1.Group.findByPk(req.body.groupid);
        if (yield group.hasUser(user)) {
            // const adUser = await group.getUsers({where: {id: user.id}});
            // adUser[0].groupuser.isAdmin = true;
            // console.log(adUser[0].groupuser.isAdmin);
            yield group.addUser(user, { through: { isAdmin: true } });
            return res.status(200).json({ success: true, message: "Admin added" });
        }
        else {
            return res.status(401).json({ success: false, message: "User not in the group" });
        }
    }
    catch (err) {
        return res.status(500).json({ success: false, err: err });
    }
});
exports.makeAdmin = makeAdmin;
const addChat = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield req.user.createChat({
            message: req.body.message,
            group: req.body.groupId
        });
        if (chat) {
            return res.status(200).json({ success: true });
        }
        else {
            return res.status(401).json({ success: false, message: "Something went wrong" });
        }
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Cannot send the message" });
    }
});
exports.addChat = addChat;
//# sourceMappingURL=group.controller.js.map
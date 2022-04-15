"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = exports.getChats = exports.addChat = void 0;
const tslib_1 = require("tslib");
// @ts-nocheck
const models_1 = require("../models");
const sequelize_1 = require("sequelize");
const aws_sdk_1 = tslib_1.__importDefault(require("aws-sdk"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const addChat = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const user = req.user;
        const chat = yield user.createChat({
            message: body.message
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
const getChats = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const lastChatId = Number(req.query.lastchatid);
    let groupId = Number(req.query.groupid);
    if (!groupId) {
        groupId = 0;
    }
    try {
        let chats;
        if (lastChatId === 0) {
            chats = yield models_1.Chat.findAll({
                where: {
                    group: groupId
                }
            });
        }
        else {
            chats = yield models_1.Chat.findAll({
                where: {
                    id: {
                        [sequelize_1.Op.gt]: lastChatId
                    },
                    group: groupId
                }
            });
        }
        if (chats) {
            return res.status(200).json({ success: true, chats: chats });
        }
        else {
            return res.status(401).json({ success: false, message: "Something went wrong" });
        }
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Cannot send the message" });
    }
});
exports.getChats = getChats;
const uploadFile = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const name = `File-${new Date()}`;
        const file = req.file;
        console.log(file);
        const url = yield upoloadToS3(file, name);
        console.log(url);
        const chat = yield user.createChat({
            message: `File link - ${url}`
        });
        if (chat) {
            return res.status(200).json({ success: true });
        }
        else {
            return res.status(401).json({ success: false, message: "Something went wrong" });
        }
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Cannot send file" });
    }
});
exports.uploadFile = uploadFile;
const upoloadToS3 = (file, name) => {
    const s3 = new aws_sdk_1.default.S3({
        accessKeyId: process.env.IAM_USERID,
        secretAccessKey: process.env.IAM_SECRET,
    });
    const fileStream = fs_1.default.createReadStream(file.path);
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: name,
        Body: fileStream,
        ACL: "public-read",
    };
    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data.Location);
        });
    });
};
//# sourceMappingURL=chat.controller.js.map
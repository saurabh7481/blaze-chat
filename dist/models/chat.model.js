"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatFactory = exports.Chat = void 0;
const sequelize_1 = require("sequelize");
class Chat extends sequelize_1.Model {
}
exports.Chat = Chat;
function ChatFactory(sequelize) {
    return sequelize.define("chats", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        message: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        group: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
    });
}
exports.ChatFactory = ChatFactory;
//# sourceMappingURL=chat.model.js.map
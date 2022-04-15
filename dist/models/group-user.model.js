"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupUserFactory = exports.GroupUser = void 0;
const sequelize_1 = require("sequelize");
class GroupUser extends sequelize_1.Model {
}
exports.GroupUser = GroupUser;
function GroupUserFactory(sequelize) {
    return sequelize.define("groupuser", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        isAdmin: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false
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
exports.GroupUserFactory = GroupUserFactory;
//# sourceMappingURL=group-user.model.js.map
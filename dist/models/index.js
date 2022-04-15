"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupUser = exports.Group = exports.Chat = exports.User = exports.dbConfig = void 0;
const tslib_1 = require("tslib");
const sequelize = tslib_1.__importStar(require("sequelize"));
const user_model_1 = require("./user.model");
const chat_model_1 = require("./chat.model");
const group_model_1 = require("./group.model");
const group_user_model_1 = require("./group-user.model");
const db_config_1 = tslib_1.__importDefault(require("../config/db.config"));
exports.dbConfig = new sequelize.Sequelize(db_config_1.default.DB, db_config_1.default.USER, db_config_1.default.PASSWORD, {
    host: db_config_1.default.HOST,
    dialect: "mysql",
});
exports.User = (0, user_model_1.UserFactory)(exports.dbConfig);
exports.Chat = (0, chat_model_1.ChatFactory)(exports.dbConfig);
exports.Group = (0, group_model_1.GroupFactory)(exports.dbConfig);
exports.GroupUser = (0, group_user_model_1.GroupUserFactory)(exports.dbConfig);
exports.User.hasMany(exports.Chat);
exports.Chat.belongsTo(exports.User);
exports.User.belongsToMany(exports.Group, { through: exports.GroupUser });
exports.Group.belongsToMany(exports.User, { through: exports.GroupUser });
//# sourceMappingURL=index.js.map
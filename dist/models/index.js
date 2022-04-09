"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.dbConfig = void 0;
const tslib_1 = require("tslib");
const sequelize = tslib_1.__importStar(require("sequelize"));
const user_model_1 = require("./user.model");
exports.dbConfig = new sequelize.Sequelize((process.env.DB_NAME), (process.env.DB_USER), (process.env.DB_PASSWORD), {
    port: Number(process.env.DB_PORT) || 54320,
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    pool: {
        min: 0,
        max: 5,
        acquire: 30000,
        idle: 10000,
    },
});
exports.User = (0, user_model_1.UserFactory)(exports.dbConfig);
//# sourceMappingURL=index.js.map
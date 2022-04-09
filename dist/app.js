"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const path_1 = tslib_1.__importDefault(require("path"));
const models_1 = require("./models");
dotenv_1.default.config();
const app = (0, express_1.default)();
//Routes
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
const PORT = process.env.PORT || 3000;
models_1.dbConfig.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at ${PORT}`);
    });
});
//# sourceMappingURL=app.js.map
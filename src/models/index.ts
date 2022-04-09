import * as sequelize from "sequelize";
import {UserFactory} from "./user.model";
import { ChatFactory } from "./chat.model";
import config from "../config/db.config";

export const dbConfig = new sequelize.Sequelize(
    config.DB,
	config.USER,
	config.PASSWORD,
	{
		host: config.HOST,
		dialect: "mysql",
	}
);

export const User = UserFactory(dbConfig);
export const Chat = ChatFactory(dbConfig);

User.hasMany(Chat);
Chat.belongsTo(User);
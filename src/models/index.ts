import * as sequelize from "sequelize";
import {UserFactory} from "./user.model";
import { ChatFactory } from "./chat.model";
import { GroupFactory } from "./group.model";
import { GroupUserFactory } from "./group-user.model";
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
export const Group = GroupFactory(dbConfig);
export const GroupUser = GroupUserFactory(dbConfig);

User.hasMany(Chat);
Chat.belongsTo(User);

User.belongsToMany(Group, {through: GroupUser});
Group.belongsToMany(User, {through: GroupUser});
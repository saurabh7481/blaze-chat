import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface ChatAttributes {
    id: number;
    message: string;
    group: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface ChatModel extends Model<ChatAttributes>, ChatAttributes {}
export class Chat extends Model<ChatModel, ChatAttributes> {}

export type ChatStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ChatModel;
};

export function ChatFactory (sequelize: Sequelize): ChatStatic {
    return <ChatStatic>sequelize.define("chats", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        group: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    });
}
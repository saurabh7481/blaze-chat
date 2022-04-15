import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface GroupUserAttributes {
    id: number;
    isAdmin: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface GroupUserModel extends Model<GroupUserAttributes>, GroupUserAttributes {}
export class GroupUser extends Model<GroupUserModel, GroupUserAttributes> {}

export type GroupUserStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): GroupUserModel;
};

export function GroupUserFactory (sequelize: Sequelize): GroupUserStatic {
    return <GroupUserStatic>sequelize.define("groupuser", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
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
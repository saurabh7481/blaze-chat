import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface GroupAttributes {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface GroupModel extends Model<GroupAttributes>, GroupAttributes {}
export class Group extends Model<GroupModel, GroupAttributes> {}

export type GroupStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): GroupModel;
};

export function GroupFactory (sequelize: Sequelize): GroupStatic {
    return <GroupStatic>sequelize.define("groups", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
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
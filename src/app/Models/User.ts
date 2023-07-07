import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../../database/index';
import { injectable } from 'inversify';

export interface UserAttributes {
    id: number;
    username: string | null;
    password: string;
    created_at: Date | null;
    updated_at: Date | null;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id' | 'created_at' | 'updated_at'>;
@injectable()
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id: number;
    public username: string;
    public password: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'User', // We need to choose the model name,
        tableName: 'users',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

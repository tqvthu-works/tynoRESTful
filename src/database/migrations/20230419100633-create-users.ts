import { QueryInterface, DataTypes } from 'sequelize';
export default {
    async up(queryInterface: QueryInterface): Promise<void> {
        await queryInterface.createTable('users', {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: true,
            }
        });
    },
    async down(queryInterface): Promise<void> {
        await queryInterface.dropTable('users');
    },
};

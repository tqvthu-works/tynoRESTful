import { QueryInterface, DataTypes } from 'sequelize';
export default {
    async up(queryInterface: QueryInterface): Promise<void> {
        await queryInterface.createTable('refresh_tokens', {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
            },
            token: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            expires_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        });
    },
    async down(queryInterface): Promise<void> {
        await queryInterface.dropTable('refresh_tokens');
    },
};

import { Model, DataTypes } from 'sequelize';

import sequelize from '../config/connection.js';
import { hashPassword } from '../utils/index.js';

class User extends Model {}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},

		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},

		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [8]
			}
		}
	},
	{
		hooks: {
			beforeCreate: (user) => hashPassword(user),
			beforeUpdate: (user) => hashPassword(user)
		},

		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: 'user'
	}
);

export default User;

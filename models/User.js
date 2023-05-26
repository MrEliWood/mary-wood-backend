const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = require('../config/connection');

class User extends Model {}

const hashPassword = async (user) => {
	user.password = await bcrypt.hash(user.password, 5);
	return user;
};

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

module.exports = User;

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},

		author_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'user',
				key: 'id'
			}
		},

		title: {
			type: DataTypes.STRING,
			allowNull: false
		},

		caption: {
			type: DataTypes.STRING,
			allowNull: true
		},

		text: {
			type: DataTypes.TEXT,
			allowNull: false
		},

		published: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},

		deleted: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: 'blog'
	}
);

module.exports = Blog;

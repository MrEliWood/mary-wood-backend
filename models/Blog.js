import { Model, DataTypes } from 'sequelize';

import sequelize from '../config/connection.js';

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
			type: DataTypes.STRING
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
		},

		publishedAt: {
			type: DataTypes.DATE,
			defaultValue: null
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

export default Blog;

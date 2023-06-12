import { Model, DataTypes } from 'sequelize';

import sequelize from '../config/connection.js';

class Image extends Model {}

Image.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},

		blog_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'blog',
				key: 'id'
			}
		},

		src: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: 'image'
	}
);

export default Image;

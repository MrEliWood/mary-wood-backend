import sequelize from '../config/connection.js';
import dotenv from 'dotenv';
dotenv.config();

import { generateBlogSeeds, generateImageSeeds, generateUserSeeds } from '../utils/index.js';
import { User, Blog, Image } from '../models/index.js';

const numberOfBlogs = 10;

const users = generateUserSeeds();
const blogs = generateBlogSeeds(numberOfBlogs);
const images = generateImageSeeds(numberOfBlogs);

const seed = async () => {
	try {
		await sequelize.sync({ force: true });

		await User.bulkCreate(users, {
			individualHooks: true
		});
		await Blog.bulkCreate(blogs);
		await Image.bulkCreate(images);

		process.exit(0);
	} catch (error) {
		console.log(error);
	}
};

seed();

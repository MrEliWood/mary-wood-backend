const sequelize = require('../config/connection');
const { User, Blog, Image } = require('../models');

const placeholderText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus laboriosam perferendis fugit debitis, odit eaque ipsam sed quam magni eligendi aspernatur quos cumque fugiat consectetur, velit similique consequuntur aut enim.';
const placeholderImage = 'http://placekitten.com/200/300';

const users = [
	{
		id: 1,
		username: 'admin',
		password: 'password'
	},
	{
		id: 2,
		username: 'mary',
		password: 'password'
	}
];

const blogs = [
	{
		author_id: 2,
		title: 'The First Blog',
		caption: 'The nicest blog there ever was and ever will be',
		text: placeholderText
	},
	{
		author_id: 2,
		title: 'The Second Blog',
		caption: 'If only every blog was like this one',
		text: placeholderText
	}
];

const images = [
	{
		blog_id: 1,
		src: placeholderImage
	},
	{
		blog_id: 2,
		src: placeholderImage
	},
	{
		blog_id: 2,
		src: placeholderImage
	},
	{
		blog_id: 2,
		src: placeholderImage
	}
];

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

import { loremIpsum } from 'lorem-ipsum';
import dotenv from 'dotenv';
dotenv.config();

import { getRandomNumber, coinFlip } from '../index.js';

const generateBlogSeeds = (numberOfBlogs) => {
	if (!numberOfBlogs) numberOfBlogs = 10;

	const blogSeeds = [];

	for (let i = 0; i < numberOfBlogs; i++) {
		const author_id = process.env.USER_ID;

		const caption = loremIpsum({
			count: getRandomNumber(1, 2),
			units: 'paragraphs'
		});

		const text = loremIpsum({
			count: getRandomNumber(1, 10),
			units: 'paragraphs'
		});

		const published = coinFlip();
		const deleted = coinFlip();

		const publishedAt = Date.now();

		let title;

		if (published && deleted) {
			title = 'This Blog was Published then Deleted';
		} else if (published) {
			title = 'This Blog is Published';
		} else if (deleted) {
			title = 'This Blog was Deleted';
		} else {
			title = 'This Blog is a Draft';
		}

		const blog = {
			author_id,
			title,
			caption,
			text,
			published,
			deleted,
			publishedAt
		};

		blogSeeds.push(blog);
	}

	return blogSeeds;
};

export default generateBlogSeeds;

import { getRandomImage, getRandomNumber } from '../index.js';

const generateImageSeeds = (numberOfBlogs) => {
	if (!numberOfBlogs) numberOfBlogs = 10;
	const numberOfImages = numberOfBlogs * 3;

	const imageSeeds = [];

	for (let i = 0; i < numberOfImages; i++) {
		const blog_id = getRandomNumber(1, numberOfBlogs);

		const src = getRandomImage();

		const image = {
			blog_id,
			src
		};

		imageSeeds.push(image);
	}

	return imageSeeds;
};

export default generateImageSeeds;

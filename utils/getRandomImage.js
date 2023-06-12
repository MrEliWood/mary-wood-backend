const getRandomImage = () => {
	// there are 16 placekittens
	const randomNumber = Math.floor(Math.random() * 16);
	return `http://placekitten.com/300/300?image=${randomNumber}`;
};

export default getRandomImage;

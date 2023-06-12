const getRandomNumber = (min, max) => {
	if (!max) max = 100;
	const randomNumber = min + Math.floor(Math.random() * max);
	return randomNumber < max ? randomNumber : max;
};

const coinFlip = () => {
	return Math.floor(Math.random() * 2);
};

export { getRandomNumber, coinFlip };

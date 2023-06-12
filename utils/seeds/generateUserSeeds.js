import dotenv from 'dotenv';
dotenv.config();

const generateUserSeeds = () => {
	const userSeeds = [
		{
			id: process.env.USER_ID,
			username: process.env.USER_NAME,
			password: process.env.USER_PASSWORD
		},
		{
			id: process.env.ADMIN_ID,
			username: process.env.ADMIN_NAME,
			password: process.env.ADMIN_PASSWORD
		}
	];

	return userSeeds;
};

export default generateUserSeeds;

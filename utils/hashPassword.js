import bcrypt from 'bcrypt';

const hashPassword = async (user) => {
	user.password = await bcrypt.hash(user.password, 5);
	return user;
};

export default hashPassword;

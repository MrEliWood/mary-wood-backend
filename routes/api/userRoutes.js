const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../../models');

const admin_id = 1;
const user_id = 2;

// GET all users
router.get('/', async (req, res) => {
	try {
		const users = await User.findAll();
		if (!users) return res.status(404).json({ error: 'There are no users.' });

		return res.status(200).json(users);
	} catch (error) {
		return res.status(500).json({ error });
	}
});

// GET one user
router.get('/:id', async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id, { include: { all: true, nested: true } });
		if (!user) return res.status(404).json({ error: 'This user could not be found.' });

		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json({ error });
	}
});

// POST user login
router.post('/login', async (req, res) => {
	try {
		const user = await User.findByPk(user_id);
		if (!user) return res.status(400).json({ error: 'This user could not be found.' });

		const passwordMatch = await bcrypt.compare(req.body.password, user.password);
		if (!passwordMatch) return res.status(400).json({ error: 'Login failed.' });

		const token = jwt.sign(user, process.env.JWT_SECRET);
		return res.status(200).json({ token, user });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

// POST admin login
router.post('/admin', async (req, res) => {
	try {
		const user = await User.findByPk(admin_id);
		if (!user) return res.status(400).json({ error: 'This user could not be found.' });

		const passwordMatch = await bcrypt.compare(req.body.password, user.password);
		if (!passwordMatch) return res.status(400).json({ error: 'Login failed.' });

		const token = jwt.sign({ user }, process.env.JWT_SECRET);
		return res.status(200).json({ token, user });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

// PUT password change
router.put('/cpw/:id', async (req, res) => {
	try {
		const user = await User.findOne({ where: { id: req.params.id } });
		if (!user) return res.status(404).json({ error: 'This user could not be found.' });

		const passwordMatch = await bcrypt.compare(req.body.password, user.password);
		if (!passwordMatch) return res.status(400).json({ error: 'Previous password incorrect.' });

		const updatedUser = await User.update(
			{
				password: req.body.newPassword
			},
			{
				where: { id: req.params.id },
				individualHooks: true
			}
		);

		return res.status(200).json({ message: 'Password changed!', updatedUser });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

// PUT password override
router.put('/pwo', async (req, res) => {
	try {
		const user = await User.findByPk(admin_id);
		if (!user) return res.status(400).json({ error: 'This user could not be found.' });

		const passwordMatch = await bcrypt.compare(req.body.password, user.password);
		if (!passwordMatch) return res.status(400).json({ error: 'Login failed.' });

		const updatedUser = await User.update(
			{
				password: 'password'
			},
			{
				where: { id: user_id },
				individualHooks: true
			}
		);

		return res.status(200).json({ message: 'Password changed!', updatedUser });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

module.exports = router;

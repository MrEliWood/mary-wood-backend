import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { User } from '../../models/index.js';

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
	try {
		const users = await User.findAll();
		if (!users) return res.status(404).json({ error: 'There are no users.' });

		return res.status(200).json(users);
	} catch (error) {
		console.error(error);
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
		console.error(error);
		return res.status(500).json({ error });
	}
});

// GET verify token
router.post('/token', async (req, res) => {
	try {
		const token = req.headers?.authorization;
		if (!token) return res.status(401).json({ error: 'You must be logged in to create a new blog post.' });

		const user = jwt.verify(token, process.env.JWT_SECRET);
		if (!user) return res.status(401).json({ error: 'You must be logged in to create a new blog post.' });

		return res.status(200).json(token);
	} catch (error) {
		console.error(error);

		return res.status(500).json({ error });
	}
});

// POST user login
router.post('/login', async (req, res) => {
	try {
		const user = await User.findByPk(req.body.id);
		if (!user) return res.status(400).json({ error: 'This user could not be found.' });

		const passwordMatch = await bcrypt.compare(req.body.password, user.password);
		if (!passwordMatch) return res.status(400).json({ error: 'Login failed.' });

		const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1d' });
		return res.status(200).json({ token, user });
	} catch (error) {
		console.error(error);
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
		console.error(error);
		return res.status(500).json({ error });
	}
});

// PUT password override
router.put('/pwo', async (req, res) => {
	try {
		const user = await User.findByPk(process.env.ADMIN_ID);
		if (!user) return res.status(400).json({ error: 'This user could not be found.' });

		const passwordMatch = await bcrypt.compare(req.body.password, user.password);
		if (!passwordMatch) return res.status(400).json({ error: 'Login failed.' });

		const updatedUser = await User.update(
			{
				password: 'password'
			},
			{
				where: { id: process.env.USER_ID },
				individualHooks: true
			}
		);

		return res.status(200).json({ message: 'Password changed!', updatedUser });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error });
	}
});

export default router;

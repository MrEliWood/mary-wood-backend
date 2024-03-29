import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { Blog } from '../../models/index.js';

const router = express.Router();

// GET all blogs
router.get('/', async (req, res) => {
	try {
		const blogs = await Blog.findAll({ include: { all: true, nested: true }, order: [['updatedAt', 'DESC']] });
		if (!blogs) return res.status(404).json({ error: 'There are no blogs.' });

		return res.status(200).json(blogs);
	} catch (error) {
		console.error(error);

		return res.status(500).json({ error });
	}
});

// GET one blog
router.get('/:id', async (req, res) => {
	try {
		const blog = await Blog.findByPk(req.params.id, { include: { all: true, nested: true } });
		if (!blog) return res.status(404).json({ error: 'This blog could not be found.' });

		return res.status(200).json(blog);
	} catch (error) {
		console.error(error);

		return res.status(500).json({ error });
	}
});

// POST new blog
router.post('/', async (req, res) => {
	try {
		const token = req.headers?.authorization;
		if (!token) return res.status(401).json({ error: 'You must be logged in to create a new blog post.' });

		const user = jwt.verify(token, process.env.JWT_SECRET);
		if (!user) return res.status(401).json({ error: 'You must be logged in to create a new blog post.' });

		const blog = await Blog.create(req.body);
		if (!blog) return res.status(400).json({ error: 'This blog could not be created.' });

		return res.status(200).json(blog);
	} catch (error) {
		console.error(error);

		return res.status(500).json({ error });
	}
});

// PUT update blog
router.put('/:id', async (req, res) => {
	try {
		const token = req.headers?.authorization;
		if (!token) return res.status(401).json({ error: 'You must be logged in to edit a blog post.' });

		const user = jwt.verify(token, process.env.JWT_SECRET);
		if (!user) return res.status(401).json({ error: 'You must be logged in to edit a blog post.' });

		const blog = await Blog.update(req.body, { where: { id: req.params.id } });
		if (!blog) return res.status(404).json({ error: 'This blog could not be found.' });

		return res.status(200).json({ message: 'Blog updated!', blog });
	} catch (error) {
		console.error(error);

		return res.status(500).json({ error });
	}
});

// DELETE blog
router.delete('/:id', async (req, res) => {
	try {
		const token = req.headers?.authorization;
		if (!token) return res.status(401).json({ error: 'You must be logged in to edit a blog post.' });

		const user = jwt.verify(token, process.env.JWT_SECRET);
		if (!user) return res.status(401).json({ error: 'You must be logged in to edit a blog post.' });

		const blog = await Blog.update({ deleted: true }, { where: { id: req.params.id } });
		if (!blog) return res.status(404).json({ error: 'This blog could not be found.' });

		return res.status(200).json({ message: 'Blog deleted!', blog });
	} catch (error) {
		console.error(error);

		return res.status(500).json({ error });
	}
});

export default router;

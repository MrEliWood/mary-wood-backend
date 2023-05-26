const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { Blog } = require('../../models');

const admin_id = 1;
const user_id = 2;

// GET all blogs
router.get('/', async (req, res) => {
	try {
		const blogs = await Blog.findAll({ include: { all: true, nested: true } });
		if (!blogs) return res.status(404).json({ error: 'There are no blogs.' });

		return res.status(200).json(blogs);
	} catch (error) {
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
		return res.status(500).json({ error });
	}
});

// POST new blog
router.post('/', async (req, res) => {
	try {
		const token = req.headers?.authorization?.split(' ').pop();
		if (!token) return res.status(401).json({ error: 'You must be logged in to create a new blog post.' });

		const user = jwt.verify(token, process.env.JWT_SECRET);
		if (!user) return res.status(401).json({ error: 'You must be logged in to create a new blog post.' });

		const blog = await Blog.create(req.body);
		if (!blog) return res.status(400).json({ error: 'This blog could not be created.' });

		return res.status(200).json(blog);
	} catch (error) {
		return res.status(500).json({ error });
	}
});

// PUT update blog
router.put('/:id', async (req, res) => {
	try {
		const token = req.headers?.authorization?.split(' ').pop();
		if (!token) return res.status(401).json({ error: 'You must be logged in to edit a blog post.' });

		const user = jwt.verify(token, process.env.JWT_SECRET);
		if (!user) return res.status(401).json({ error: 'You must be logged in to edit a blog post.' });

		const blog = await Blog.update(req.body, { where: { id: req.params.id } });
		if (!blog) return res.status(404).json({ error: 'This blog could not be found.' });

		return res.status(200).json({ message: 'Blog updated!', blog });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

// DELETE blog
router.delete('/:id', async (req, res) => {
	try {
		const token = req.headers?.authorization?.split(' ').pop();
		if (!token) return res.status(401).json({ error: 'You must be logged in to edit a blog post.' });

		const user = jwt.verify(token, process.env.JWT_SECRET);
		if (!user) return res.status(401).json({ error: 'You must be logged in to edit a blog post.' });

		const blog = await Blog.destroy({ where: { id: req.params.id } });
		if (!blog) return res.status(404).json({ error: 'This blog could not be found.' });

		return res.status(200).json({ message: 'Blog deleted!', blog });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

module.exports = router;

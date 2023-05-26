const User = require('./User');
const Blog = require('./Blog');
const Image = require('./Image');

User.hasMany(Blog, {
	foreignKey: 'author_id'
});

Blog.belongsTo(User, {
	as: 'author',
	foreignKey: 'author_id',
	onDelete: 'CASCADE'
});

Blog.hasMany(Image, {
	foreignKey: 'blog_id'
});

Image.belongsTo(Blog, {
	as: 'blog',
	foreignKey: 'blog_id',
	onDelete: 'CASCADE'
});

module.exports = { User, Blog, Image };

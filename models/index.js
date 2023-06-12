import User from './User.js';
import Blog from './Blog.js';
import Image from './Image.js';

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

export { User, Blog, Image };

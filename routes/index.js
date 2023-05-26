const router = require('express').Router();

const api = require('./api');

router.use('/api', api);

router.use((req, res) => {
	res.send('<h1>Welcome to the Found Ark API</h1>');
});

module.exports = router;

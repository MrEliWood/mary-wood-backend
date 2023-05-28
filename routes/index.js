const router = require('express').Router();

const api = require('./api');

router.use('/api', api);

router.use((req, res) => {
	res.status(418).redirect('https://http.cat/418');
});

module.exports = router;

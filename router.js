const controller = require('./controller');
const Router = require('express');

const router = new Router();

router.post('/', controller.receiveData);
router.get('/', controller.test);


module.exports = router;

const express = require('express');

const router = express();

const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.get('/register', authController.getregister);
router.get('/', authController.getloginForm);
router.post('/login', authController.login);
router.post('/logout', authController.logout);



router.get('/index', (req, res) => {
    res.render('index');
});

module.exports = router;
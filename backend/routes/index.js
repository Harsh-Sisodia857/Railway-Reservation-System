const express = require("express")
const router = express.Router();
const homeController = require("../controller/homeController")

router.get('/dashboard', homeController.home)
router.use('/user', require('./user'))
router.use('/train', require('./train'))
router.use('/book', require('./book'))


module.exports = router;

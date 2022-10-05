const express = require('express')
const router = express.Router()
const userController = require('../Controller/userController')
const { verifyToken } = require('../Middleware/verifyToken')


router.post('/signup', userController.createUser)

router.post("/signin", userController.signIn)

router.get("/getme", verifyToken, userController.getme)


module.exports = router
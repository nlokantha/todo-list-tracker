const express = require("express")
const {registerUser,loginUser,getTodos} = require("../controllers/auth-controller")

const router = express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/get/:userId",getTodos)



module.exports = router
const express = require("express")
const { addTodo, updateTodo } = require("./../controllers/todo-controller")
const router = express.Router()

router.post("/create/:userId", addTodo)
router.patch("/update/:todoId", updateTodo)

module.exports = router

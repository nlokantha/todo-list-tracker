const express = require("express")
const {
  addTodo,
  updateTodo,
  completedTodos,
} = require("./../controllers/todo-controller")
const router = express.Router()

router.post("/create/:userId", addTodo)
router.patch("/update/:todoId", updateTodo)
router.patch("/completed/:date", completedTodos)

module.exports = router

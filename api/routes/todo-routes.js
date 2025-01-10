const express = require("express")
const {
  addTodo,
  updateTodo,
  completedTodos,
  getCount,
} = require("./../controllers/todo-controller")
const router = express.Router()

router.post("/create/:userId", addTodo)
router.patch("/update/:todoId", updateTodo)
router.get("/completed/:date", completedTodos)
router.get("/getCount", getCount)

module.exports = router

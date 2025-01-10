const User = require("../models/user")
const Todo = require("../models/todo")
const moment = require("moment")

const addTodo = async (req, res) => {
  try {
    const userId = req.params.userId
    const { title, category } = req.body

    const newTodo = new Todo({
      title,
      category,
      dueDate: moment().format("YYYY-MM-DD"),
    })

    await newTodo.save()

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not Found",
      })
    }

    user?.todos.push(newTodo._id)
    await user.save()

    res.status(200).json({
      success: true,
      message: "todo add successfully",
      todo: newTodo,
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      success: false,
      message: "some error occured!",
    })
  }
}

const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      {
        status: "completed",
      },
      { new: true }
    )

    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: "todo not found!",
      })
    }

    res.status(200).json({
      success: true,
      todo: updatedTodo,
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      success: false,
      message: "some error occured!",
    })
  }
}

// const completedTodos = async (req, res) => {
//   try {
//     const date = req.params.date
//     const comTodos = await Todo.find({
//       status: "completed",
//       createdAt: {
//         $gte: new Date(`${date}T00:00:00:000Z`), //start of the selected Date
//         $lt: new Date(`${date}T23:59:59:999Z`), // end of the selected date
//       },
//     })
//     res.status(200).json({
//       success: true,
//       todos: comTodos,
//     })
//   } catch (e) {
//     console.log(e)
//     res.status(500).json({
//       success: false,
//       message: "some error occured!",
//     })
//   }
// }
const completedTodos = async (req, res) => {
  try {
    const date = req.params.date
    const startOfDay = new Date(
      Date.UTC(
        parseInt(date.split("-")[0]), // Year
        parseInt(date.split("-")[1]) - 1, // Month (0-based)
        parseInt(date.split("-")[2]) // Day
      )
    )
    const endOfDay = new Date(startOfDay)
    endOfDay.setUTCDate(startOfDay.getUTCDate() + 1)

    const comTodos = await Todo.find({
      status: "completed",
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    }).exec()

    res.status(200).json({
      success: true,
      todos: comTodos,
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    })
  }
}

const getCount = async (req, res) => {
  try {
    const totalCompletedTodos = await Todo.countDocuments({
      status: "completed",
    })
    const totalPendingTodos = await Todo.countDocuments({
      status: "pending",
    })

    res.status(200).json({
      success: true,
      totalCompletedTodos,
      totalPendingTodos,
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      success: false,
      message: "some error occured!",
    })
  }
}

module.exports = {
  addTodo,
  updateTodo,
  completedTodos,
  getCount,
}

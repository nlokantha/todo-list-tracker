const User = require("../models/user")
const Todo = require("../models/todo")
const moment = require("moment")

const addTodo = async (req,res)=>{
    try{
        const userId = req.params.userId
        const {title,category} = req.body

        const newTodo = new Todo({
            title,
            category,
            dueDate:moment().format("YYYY-MM-DD")
        })

        await newTodo.save()

        const user = await User.findById(userId)

        if(!user){
           return res.status(404).json({
                success:false,
                message:"User not Found"
            })
        }

        user?.todos.push(newTodo._id)
        await user.save()

        res.status(200).json({
            success:true,
            message:"todo add successfully",
            todo:newTodo
        })


    }catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message:"some error occured!"
        })
    }
}

const updateTodo = async (req,res)=>{
    try{
        const todoId = req.params.todoId

        const updatedTodo = await Todo.findByIdAndUpdate(todoId,{
            status:"completed"
        },{new:true})


        if(!updatedTodo){
            return res.status(404).json({
                success:false,
                message:"todo not found!"
            })
        }

        res.status(200).json({
            success:true,
            todo:updatedTodo
        })

    }catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message:"some error occured!"
        })
    }
}

module.exports = {
    addTodo,
    updateTodo
}
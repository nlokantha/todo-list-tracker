const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:["pending","completed"],
        default:"pending"
    },
    category:{
        type:String,
        required:true
        
    },
    dueDate:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
})

module.exports = mongoose.model("Todo",todoSchema)

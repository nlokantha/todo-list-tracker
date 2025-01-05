const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    category:{
        type:String,
        enum:["pending","completed"],
        default:"pending"
        
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

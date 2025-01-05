require("dotenv").config()
const express = require("express")
const connectToDB = require("./database/db")
const authRoutes = require("./routes/auth-routes")


const app = express()
const PORT = process.env.PORT

connectToDB()



app.use(express.json())
app.use("/auth",authRoutes)




app.listen(PORT,()=>{
    console.log(`Server is running ${PORT}`)
})



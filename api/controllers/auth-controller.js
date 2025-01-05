const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if email is already registerd
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registerd!");
      return res.status(400).json({
        success: false,
        message: "Email already registered!",
      });
    }

    // hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occur!",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email",
      });
    }

    // if the password is correct or not
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // if (user.password !== password) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Invalid Password",
    //   });
    // }

    // create user token
    const accessToken = jwt.sign(
      { userId: user._id},process.env.JWT_SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );

    res.status(200).json({
        success:true,
        message:"Logged in successful",
        accessToken
    })




  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occur!",
    });
  }
};

const getTodos = async (req,res)=>{
  try{
    const userId = req.params.userId

    const user = await User.findById(userId).populate("todos")

    if(!user){
      return res.status(404).json({
        success:false,
        message:"user not found!"
      })
    }

    res.status(200).json({
      success:true,
      todos: user?.todos
    })


  }catch(e){
    console.log(e)
    res.status(500).json({
      success: false,
      message: "Some error occur!",
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getTodos
};

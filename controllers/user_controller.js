const User = require("../models/user.js");
const bcrypt=require("bcryptjs");


const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.find({});
    if (!users) {
      return res.status(404).json({ status: false, message: "User Not Found" });
    }
    return res.status(200).json({ message: "success", user: users });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error" });
  }
};

//* __________________________________`signup`___________________________________//

const signup = async (req, res) => {
  let existingUser;
  const { name, email, phone,password} = req.body;
  try {
    existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exist! Login instead",
      });
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    user.save();

    console.log(`User ${user.name} registered successfully`);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Could not register user." });
  }
};

//* __________________________________`Login`___________________________________//

const login = async (req, res) => {
  let existingUser;
  const { email, password } = req.body;
  try {
    existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        message: "Could not find User by this email",
      });
    }
    const isValidPassword = bcrypt.compareSync(password, existingUser.password);
    if (!isValidPassword) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    console.log(`User: ${existingUser.name} logged in successfully`);
    res
      .status(200)
      .json({ status: true, message: "User logged in Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "server error." });
  }
};

//*----------`exports`----------//
module.exports = {
  getAllUsers,
  signup,
  login,
};

const UserModel = require("../module/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "IUEGIUHRIVHROIFH";

// UserController
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!password || !email) {
      return res
        .status(400)
        .json({ message: "Please enter both password and email" });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const CheckPassword = await bcrypt.compare(password, user.password);
    if (!CheckPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid email or password",
    });
  }
};

const register = async (req, res) => {
  const { username, password, email, confirmpassword } = req.body;

  if (!username || !password || !email || !confirmpassword) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  console.log(req.body);
  if (password !== confirmpassword) {
    return res
      .status(400)
      .json({ message: "Password and confirm password do not match" });
  }

  try {
    const useremail = await UserModel.findOne({ email });
    if (useremail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const UserRegister = new UserModel({
      username: username,
      email: email,
      password: hashPassword,
    });
    const Registerinfo = await UserRegister.save();

    res.status(200).json({
      message: "User created successfully",
      data: Registerinfo,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error Occured",
      error: error.message,
    });
  }
};

const forgetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const useremail = await UserModel.findOne({ email });
    if (!useremail) {
      return res.status(400).json({ message: "Email does not exist" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const updatePassword = await useremail.updateOne({
      $set: { password: hashPassword },
    });

    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Occured",
    });
  }
};

const UserController = {
  login,
  register,
  forgetPassword
};
module.exports = UserController;

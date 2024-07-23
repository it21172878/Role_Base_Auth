import UserModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res
        .status(401)
        .send({ success: false, message: 'User already exists' });
    }
    const hashPassword = await bcrypt.hashSync(password, 10);
    const newUser = new UserModel({
      name,
      email,
      password: hashPassword,
      role,
    });
    await newUser.save();
    res.status(200).send({
      success: true,
      message: 'User registered successfully!',
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'User registration unsuccessful',
      error: error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ success: false, message: 'Invalid Email' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(404)
        .json({ success: false, message: 'Invalid Password' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_CODE);
    // set token with login user
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: false,
    });
    res.status(200).send({
      success: true,
      message: 'User login Successful',
      user,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'User login unsuccessful',
      error: error,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).send({ success: true, message: 'User logout Successful' });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'User logout unsuccessful',
      error: error,
    });
  }
};

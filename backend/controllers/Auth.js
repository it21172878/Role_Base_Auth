import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res
        .status(401)
        .json({ success: false, message: 'User already exists' });
    }
    const hashPassword = await bcrypt.hashSync(password, 10);
    const newUser = new UserModel({
      name,
      email,
      password: hashPassword,
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

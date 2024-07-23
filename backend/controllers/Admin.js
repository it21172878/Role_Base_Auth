import UserModel from '../models/user.model.js';

export const GetUser = async (req, res) => {
  try {
    const user = await UserModel.find();
    res.status(200).send({ user: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Internal server error',
      error: error,
    });
  }
};

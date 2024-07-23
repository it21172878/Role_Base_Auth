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

export const DeleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({
      success: true,
      message: 'User deleted successfully',
      user: user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Internal server error',
      error: error,
    });
  }
};

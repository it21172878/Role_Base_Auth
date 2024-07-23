import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

const isAdmin = async (req, res, next) => {
  try {
    // get token from req.cookies
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res.status(401).send({
        message:
          'You are not authorized to access this route-no token provided',
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_CODE);
    console.log(decoded);
    // find user by decoded
    const user = await UserModel.findById(decoded.userId);
    console.log(user);
    // check user exist
    if (!user) {
      return res.status(401).send({
        message: 'User not found',
      });
    }
    // check user is admin
    if (user.role !== 'admin') {
      return res.status(403).send({
        message: 'Unathorized: User is not an Admin',
      });
    }
    // req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default isAdmin;

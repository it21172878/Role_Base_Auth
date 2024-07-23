import express from 'express';
import { DeleteUser, GetUser } from './../controllers/Admin.js';
import isAdmin from './../middleware/verifyToken.js';

const AdminRoutes = express.Router();

AdminRoutes.get('/getuser', isAdmin, GetUser);
AdminRoutes.delete('/delete/:id', isAdmin, DeleteUser);

export default AdminRoutes;

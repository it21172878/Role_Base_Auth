import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import DbCon from './utils/db.js';
import AuthRoutes from './routes/Auth.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// mongo db connection
DbCon();

app.use(express.json());
app.use(cors());

app.use('/api/auth', AuthRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

import mongoose from 'mongoose';

const DbCon = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log('mongo db connected successfully!');
  } catch (error) {
    console.log(error);
  }
};

export default DbCon;

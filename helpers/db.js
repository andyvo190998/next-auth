import mongoose from 'mongoose';

export const connectDb = async () => {
  const API_KEY = process.env.API_KEY;
  await mongoose
    .connect(API_KEY)
    .then(() => console.log('DB connected'))
    .catch(() => console.log('connect fail'));
};

import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb+srv://Aksheg:Application123@cluster0.zglxubu.mongodb.net/movie'

export const connect = async () => {
  try {
    await mongoose.connect(DATABASE_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
   
  } catch (err) {
    console.log(err);
  }
};
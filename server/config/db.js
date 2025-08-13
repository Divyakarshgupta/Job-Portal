import mongoose from "mongoose";

// connect to mongodb

const connectDB = async () => {
    

  mongoose.connection.on("connected", () => console.log("Database connected"));
  
  await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`);
  console.log(process.env.MONGODB_URI);
}

export default connectDB
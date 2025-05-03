import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js ";
import hotelsRoute from "./routes/hotels.js ";
import roomsRoute from "./routes/rooms.js ";
import usersRoute from "./routes/users.js ";
import cookieParser from "cookie-parser";
import  cors from "cors";

const app =express()
dotenv.config(); 

const connect = async ()=>{
  
    try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongoDB");
  } catch (error) {
    console.log(error);
  }  
};
  //middlewares 
   app.use(cors())
  app.use(cookieParser());
   //for cross-origin resource sharing
  app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);
app.use("/api/users",usersRoute);

app.use((err,req,res,next)=>{
  const errorStatus =err.status || 500
  const errMessage = err.message || "something went wrong"
  return res.status( errorStatus).json( {
    success: false,
    status :errorStatus,
    message:errMessage,
    stack: err.stack,
  } );
}); 



app.listen(8800,()=>{
  connect(); 
    console.log("connected to backend");
});   
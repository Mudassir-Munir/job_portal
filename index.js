//import

// common js
//const express = require("express");

// module js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

//file imports
import connectDb from "./config/database.js";

// routes import
import testRoutes from "./routes/testRouter.js";
import authRoutes from "./routes/authRoutes.js";

//middleware import
// import errorMiddleware from "./middlewares/errorMiddleware.js";

// dot Env config
dotenv.config();

// Database connection
connectDb();

// rest object
const app = express();

//middlewares
app.use(express.json());
// cors package is used for cross origin connection
app.use(cors());
// morgan package is used to represent logs
app.use(morgan('dev'));

// routes
// app.get("/", (req, res) => {
//    res.send("<h1>Welcome to Job Portal</h1>");
// });


app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);

// for using error middelware uncomment below line
// app.use(errorMiddleware);

const port = process.env.PORT || 8000

// listen
app.listen(port, () => {
   console.log(`Node server running in ${process.env.DEV_MODE} mode on port ${port}`);
});



//import

// common js
//const express = require("express");

// swagger documentation packages
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";

// module js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
// security packages imports
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

//file imports
import connectDb from "./config/database.js";

// routes import
import testRoutes from "./routes/testRouter.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

//middleware import
// import errorMiddleware from "./middlewares/errorMiddleware.js";

// dot Env config
dotenv.config();

// Database connection
connectDb();

// swagger api config
const options = {
   definition:{
   openapi: "3.0.3",
   info: {
      title:"Job Portal Application",
      description: "Node Express Js Job Portal Application",
      version: "1.0.0",
   },
   servers: [
      {
       url: "http://localhost:8000",
      },
   ],
   },
   apis: ["./routes/*.js"],
};

const spec = swaggerDoc(options);

// rest object
const app = express();

//middlewares
// helmet package is used for securing headers data
app.use(helmet());
// xss-clean package is used to prevent from cross site scripting attacks
app.use(xss());
// express-mongo-sanitize package is used to prevent mongodb from data injection
app.use(mongoSanitize());
// use json
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
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobRoutes);

// homeroute root
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

// for using error middelware uncomment below line
// app.use(errorMiddleware);

const port = process.env.PORT || 8000

// listen
app.listen(port, () => {
   console.log(`Node server running in ${process.env.DEV_MODE} mode on port ${port}`);
});
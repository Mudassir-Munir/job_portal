//import

// common js
//const express = require("express");

// module js
import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/database.js";

// dot Env config
dotenv.config();

// Database connection
connectDb();

// rest object
const app = express();

// routes
app.get("/", (req, res) => {
   res.send("<h1>Welcome to Job Portal</h1>");
});

const port = process.env.PORT || 8000

// listen
app.listen(port, () => {
   console.log(`Node server running in ${process.env.DEV_MODE} mode on port ${port}`);
});



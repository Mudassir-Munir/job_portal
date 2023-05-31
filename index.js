//import

const express = require("express");

// rest object
const app = express();

// routes
app.get("/", (req, res) => {
   res.send("<h1>Welcome to Job Portal</h1>");
});

// listen
app.listen(8000, () => {
   console.log("Node server running on port 8000");
});



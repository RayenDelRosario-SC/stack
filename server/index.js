const express = require("express");
const app = express();
const cors = require("cors");


//middleware
app.use(express.json)//req.body
app.use(cors());

//ROUTES//
app.use("/auth", require("./routes/jwtAuth"));

//register and login routes




//dashboard routes



app.listen(5000, () => {
    console.log("server is running on port 5000");
});
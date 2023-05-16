const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");


//middleware

app.use(cors());
app.use(express.json());

//routes

app.use("/auth", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));


app.use("/trainer", require("./routes/trainer"));


app.use("/student", require("./routes/student"));

app.use("/feedback", require("./routes/feedback"));









app.listen(5000, () => {
  console.log(`Server is starting on port 5000`);
});
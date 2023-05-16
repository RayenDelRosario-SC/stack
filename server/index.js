const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

//routes

app.use("/auth", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));



//trainer route

// Create a trainer

app.post("/trainer", async (req, res) => {
  try {
      const { trainers_fname, trainers_lname, trainers_email, trainers_password, trainers_number, trainers_address, trainers_time_in, trainers_time_out } = req.body;
      const newTrainer = await pool.query("INSERT INTO trainer_tbl (trainers_fname, trainers_lname, trainers_email, trainers_password, trainers_number, trainers_address, trainers_time_in, trainers_time_out) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", 
      [trainers_fname, trainers_lname, trainers_email, trainers_password, trainers_number, trainers_address, trainers_time_in, trainers_time_out]
      );
      
      
      res.json(newTrainer.rows[0]);
  } catch (err) {
      console.error(err.message);
  }
});

// Get all trainer

app.get("/trainer", async(req, res) => {
  try {
      const allTrainer= await pool.query("SELECT * FROM trainer_tbl");
      res.json(allTrainer.rows);
  
  } catch (err) {
      console.error(err.message);
      
  }
  
});

// Get a trainer

app.get("/trainer/:trainers_id", async (req, res) => {
  try {
      const { trainers_id } = req.params;
      const todo = await pool.query("SELECT * FROM trainer_tbl WHERE trainers_id = $1",[
          trainers_id
      ]);
      res.json(todo.rows[0]);
  } catch (err) {
      console.error(err.message);
  }
});

// Update a trainer

app.put("/trainer/:id", async(req, res) => {
  try {
      const { id } = req.params;
      const { trainers_fname, trainers_lname, trainers_email, trainers_password, trainers_number, trainers_address, trainers_time_in, trainers_time_out } = req.body;
      const updateTrainer = await pool.query("UPDATE trainer_tbl SET trainers_fname = $1, trainers_lname = $2, trainers_email = $3, trainers_password = $4, trainers_number = $5, trainers_address = $6, trainers_time_in = $7, trainers_time_out = $8 WHERE trainers_id = $9",
      [trainers_fname, trainers_lname, trainers_email, trainers_password, trainers_number, trainers_address, trainers_time_in, trainers_time_out, id ]);

      res.json("Trainer Account was updated");
  } catch (err) {
      console.error(err.message);
   
  }
});

// Delete a trainer

app.delete("/trainer/:trainers_id", async(req, res) => {
  try {

      const { trainers_id } = req.params;
      const deleteTrainer = await pool.query("DELETE FROM trainer_tbl WHERE trainers_id = $1", [trainers_id]);
      res.json("Trainer Account was deleted!")
  } catch (err) {
      console.error(err.message);
      
  }
});





//trainer route

// Create a student
app.post("/student", async(req, res) => {
  try {
    const { s_fname, s_lname, s_email, s_password, s_number, s_address, trainers_id } = req.body;
    const newStudent = await pool.query("INSERT INTO student_tbl (student_fname, student_lname, student_email, student_password, student_number, student_address, trainers_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *", 
    [s_fname, s_lname, s_email, s_password, s_number, s_address, trainers_id]
    );
        
    res.json(newStudent.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


// Get all student

app.get("/student", async(req, res) => {
  try {
      const allStudent= await pool.query("SELECT * FROM student_tbl");
      res.json(allStudent.rows);
  
  } catch (err) {
      console.error(err.message);
      
  }
  
});

// Get a student

app.get("/student/:student_id", async (req, res) => {
  try {
      const { student_id } = req.params;
      const studentAll = await pool.query("SELECT * FROM student_tbl WHERE student_id = $1",[
          student_id
      ]);
      res.json(studentAll.rows[0]);
  } catch (err) {
      console.error(err.message);
  }
});

// Update a student

app.put("/student/:student_id", async(req, res) => {
  try {
      const { student_id } = req.params;
      const { s_fname, s_lname, s_email, s_password, s_number, s_address, trainers_id } = req.body;
      const updateStudent = await pool.query("UPDATE student_tbl SET student_fname = $1, student_lname = $2, student_email = $3, student_password = $4, student_number = $5, student_address = $6, trainers_id = $7 WHERE student_id = $8",
      [s_fname, s_lname, s_email, s_password, s_number, s_address, trainers_id, student_id]);

      res.json("Student Info was Updated");
  } catch (err) {
      console.error(err.message);
   
  }
});

// Delete a student

app.delete("/student/:student_id", async(req, res) => {
  try {

      const { student_id } = req.params;
      const deleteStudent = await pool.query("DELETE FROM student_tbl WHERE student_id = $1", [student_id]);
      res.json("Student Account was deleted!")
  } catch (err) {
      console.error(err.message);
      
  }
});






//Feedback route

// Create a feedback

app.post("/feedback", async (req, res) => {
  try {
      const { studentID, trainersId, comments, feedback_stars } = req.body;
      const newFeedback = await pool.query("INSERT INTO feedback_tbl (student_id, trainers_id, comments, feedback_stars) VALUES($1, $2, $3, $4) RETURNING *", 
      [studentID, trainersId, comments, feedback_stars]
      );
      res.json(newFeedback.rows[0]);

  } catch (err) {
      console.error(err.message);
  }
});

// Get all Feedback

app.get("/feedback", async(req, res) => {
  try {
      const allFeedback= await pool.query("SELECT * FROM feedback_tbl");
      res.json(allFeedback.rows);
  
  } catch (err) {
      console.error(err.message);
      
  }
  
});

// Get a feedback

app.get("/feedback/:feedback_id", async (req, res) => {
  try {
      const { feedback_id } = req.params;
      const feedback = await pool.query("SELECT * FROM feedback_tbl WHERE feedback_id = $1",[
          feedback_id
      ]);
      res.json(feedback.rows[0]);
  } catch (err) {
      console.error(err.message);
  }
});

// Update a feedback

app.put("/feedback/:feedback_id", async(req, res) => {
  try {
      const { feedback_id } = req.params;
      const { studentID, trainersId, comments, feedback_star} = req.body;
      const updateFeedback = await pool.query("UPDATE feedback_tbl SET student_id = $1, trainers_id = $2, comments = $3, feedback_stars = $4 WHERE feedback_id = $5",
      [ studentID, trainersId, comments, feedback_star, feedback_id]);

      res.json("Feedback Info was Updated");
  } catch (err) {
      console.error(err.message);
   
  }
});

// Delete a feedback

app.delete("/feedback/:feedback_id", async(req, res) => {
  try {

      const { feedback_id } = req.params;
      const deletefeedback = await pool.query("DELETE FROM feedback_tbl WHERE feedback_id = $1", [feedback_id]);
      res.json("feedback Account was deleted!")
  } catch (err) {
      console.error(err.message);
      
  }
});









app.listen(5000, () => {
  console.log(`Server is starting on port 5000`);
});
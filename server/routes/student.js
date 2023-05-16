const router = require("express").Router();
const pool = require("../db");

//trainer route

// Create a trainer

router.post("/student", async (req, res) => {
    try {
        const { student_fname, student_lname, student_email, student_password, student_number, student_address } = req.body;
        const newStudent = await pool.query("INSERT INTO student_tbl (student_fname, student_lname, student_email, student_password, student_number, student_address) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", 
        [student_fname, student_lname, student_email, student_password, student_number, student_address]
        );
        
        
        res.json(newStudent.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
});

// Get all trainer

router.get("/student", async(req, res) => {
    try {
        const allStudent= await pool.query("SELECT * FROM student_tbl");
        res.json(allStudent.rows);
    
    } catch (err) {
        console.error(err.message);
        
    }
    
});

// Get a trainer

router.get("/student/:student_id", async (req, res) => {
    try {
        const { student_id } = req.params;
        const todo = await pool.query("SELECT * FROM student_tbl WHERE student_id = $1",[
            student_id
        ]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Update a trainer

router.put("/student/:student_id", async(req, res) => {
    try {
        const { student_id } = req.params;
        const { student_fname, student_lname, student_email, student_password, student_number, student_address } = req.body;
        const updateStudent = await pool.query("UPDATE student_tbl SET student_fname = $1, student_lname = $2, student_email = $3, student_password = $4, student_number = $5, student_address = $6 WHERE student_id = $7",
        [student_fname, student_lname, student_email, student_password, student_number, student_address, student_id]);

        res.json("Student Info was Updated");
    } catch (err) {
        console.error(err.message);
     
    }
});

// Delete a trainer

router.delete("/student/:student_id", async(req, res) => {
    try {

        const { student_id } = req.params;
        const deleteStudent = await pool.query("DELETE FROM student_tbl WHERE student_id = $1", [student_id]);
        res.json("Student Account was deleted!")
    } catch (err) {
        console.error(err.message);
        
    }
});




module.exports = router;
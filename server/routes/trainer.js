const router = require("express").Router();
const pool = require("../db");

//trainer route

// Create a trainer

router.post("/trainer", async (req, res) => {
    try {
        const { trainers_fname, trainers_lname, trainers_email, trainers_password, trainers_number, trainers_address, trainers_time_in, trainers_time_out } = req.body;
        const newTrainer = await pool.query("INSERT INTO trainers_tbl (trainers_fname, trainers_lname, trainers_email, trainers_password, trainers_number, trainers_address, trainers_time_in, trainers_time_out) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", 
        [trainers_fname, trainers_lname, trainers_email, trainers_password, trainers_number, trainers_address, trainers_time_in, trainers_time_out]
        );
        
        
        res.json(newTrainer.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Get all trainer

router.get("/trainer", async(req, res) => {
    try {
        const allTrainer= await pool.query("SELECT * FROM trainer_tbl");
        res.json(allTrainer.rows);
    
    } catch (err) {
        console.error(err.message);
        
    }
    
});

// Get a trainer

router.get("/trainer/:trainers_id", async (req, res) => {
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

router.put("/trainer/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { trainers_fname, trainers_lname, trainers_email, trainers_password, trainers_number, trainers_address, trainers_time_in, trainers_time_out } = req.body;
        const updateTrainer = await pool.query("UPDATE trainers_tbl SET trainers_fname = $1, trainers_lname = $2, trainers_email = $3, trainers_password = $4, trainers_number = $5, trainers_address = $6, trainers_time_in = $7, trainers_time_out = $8 WHERE trainers_id = $9",
        [trainers_fname, trainers_lname, trainers_email, trainers_password, trainers_number, trainers_address, trainers_time_in, trainers_time_out, id ]);

        res.json("Todo was updated");
    } catch (err) {
        console.error(err.message);
     
    }
});

// Delete a trainer

router.delete("/trainer/:trainers_id", async(req, res) => {
    try {

        const { trainers_id } = req.params;
        const deleteTrainer = await pool.query("DELETE FROM trainer_tbl WHERE trainers_id = $1", [trainers_id]);
        res.json("Trainer Account was deleted!")
    } catch (err) {
        console.error(err.message);
        
    }
});




module.exports = router;
const router = require("express").Router();
const pool = require("../db");

//trainer route

// Create a trainer

router.post("/feedback", async (req, res) => {
    try {
        const { comments, feedback_stars } = req.body;
        const newFeedback = await pool.query("INSERT INTO feedback_tbl (comments, feedback_stars) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", 
        [comments, feedback_stars]
        );
        res.json(newFeedback.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
});

// Get all trainer

router.get("/feedback", async(req, res) => {
    try {
        const allFeedback= await pool.query("SELECT * FROM feedback_tbl");
        res.json(allFeedback.rows);
    
    } catch (err) {
        console.error(err.message);
        
    }
    
});

// Get a trainer

router.get("/feedback/:feedback_id", async (req, res) => {
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

// Update a trainer

router.put("/feedback/:feedback_id", async(req, res) => {
    try {
        const { feedback_id } = req.params;
        const { comments, feedback_star} = req.body;
        const updateFeedback = await pool.query("UPDATE feedback_tbl SET comments = $1, feedback_stars = $2 WHERE feedback_id = $3",
        [comments, feedback_star, feedback_id]);

        res.json("Feedback Info was Updated");
    } catch (err) {
        console.error(err.message);
     
    }
});

// Delete a trainer

router.delete("/feedback/:feedback_id", async(req, res) => {
    try {

        const { feedback_id } = req.params;
        const deletefeedback = await pool.query("DELETE FROM feedback_tbl WHERE feedback_id = $1", [feedback_id]);
        res.json("feedback Account was deleted!")
    } catch (err) {
        console.error(err.message);
        
    }
});




module.exports = router;
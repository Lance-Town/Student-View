require("dotenv").config();

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL database");
});

// API endpoint to fetch all students
app.get("/students", (req, res) => {
    db.query("SELECT * FROM students", (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(result);
    });
});

// API endpoint to fetch a specific student by name
app.get("/students/:name", (req, res) => {
    const studentName = req.params.name;

    db.query(
        "SELECT * FROM students WHERE name = ?",
        [studentName],
        (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (result.length === 0) {
                return res.status(404).send({ message: "Student not found" });
            }

            res.json(result[0]);
        }
    );
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

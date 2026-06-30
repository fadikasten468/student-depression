const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();

// Gör så att HTML/CSS/JS i public-mappen fungerar
app.use(express.static("public"));

// Öppna databasen
const db = new sqlite3.Database("./database/student_depression.db");

// ===============================
// Academic Pressure
// ===============================
app.get("/api/pressure", (req, res) => {

    const sql = `
        SELECT
            "Academic Pressure" AS pressure,
            ROUND(AVG(Depression) * 100, 2) AS depressedPercent
        FROM students
        GROUP BY "Academic Pressure"
        ORDER BY pressure
    `;

    db.all(sql, [], (err, rows) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);

    });

});

// ===============================
// Sleep Duration
// ===============================
app.get("/api/sleep", (req, res) => {

    const sql = `
        SELECT
            "Sleep Duration" AS sleep,
            ROUND(AVG(Depression) * 100, 2) AS depressedPercent
        FROM students
        GROUP BY "Sleep Duration"
    `;

    db.all(sql, [], (err, rows) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);

    });

});

// ===============================
// Financial Stress
// ===============================
app.get("/api/finance", (req, res) => {

    const sql = `
        SELECT
            "Financial Stress" AS stress,
            ROUND(AVG(Depression) * 100, 2) AS depressedPercent
        FROM students
        GROUP BY "Financial Stress"
        ORDER BY stress
    `;

    db.all(sql, [], (err, rows) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);

    });

});

// ===============================
// Statistics (Age)
// ===============================
app.get("/api/statistics", (req, res) => {

    db.all(`SELECT Age FROM students ORDER BY Age`, [], (err, rows) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const ages = rows.map(r => Number(r.Age));

        // Mean
        const mean = ages.reduce((sum, age) => sum + age, 0) / ages.length;

        // Median
        const middle = Math.floor(ages.length / 2);

        let median;

        if (ages.length % 2 === 0) {
            median = (ages[middle - 1] + ages[middle]) / 2;
        } else {
            median = ages[middle];
        }

        // Standard deviation
        const variance = ages.reduce((sum, age) => {
            return sum + Math.pow(age - mean, 2);
        }, 0) / ages.length;

        const standardDeviation = Math.sqrt(variance);

        res.json({
            mean: mean.toFixed(2),
            median: median,
            standardDeviation: standardDeviation.toFixed(2)
        });

    });

});

// ===============================
// Starta servern
// ===============================
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
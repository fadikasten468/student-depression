const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/student_depression.db");

db.get("SELECT COUNT(*) as total FROM students", (err, row) => {
    if (err) {
        console.log("FEL:", err.message);
    } else {
        console.log("Antal rader:", row.total);
    }
    db.close();
});
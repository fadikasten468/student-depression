const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/student_depression.db");

db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, rows) => {
    if (err) console.log("Fel:", err.message);
    else {
        if (rows.length === 0) console.log("Inga tabeller hittades. Databasen är tom.");
        else console.log("Tabeller:", rows.map(r => r.name));
    }
    db.close();
});
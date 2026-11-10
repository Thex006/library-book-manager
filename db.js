/* shared database code, used by every page */
let db;

/* load the database */
async function loadDatabase() {
    const SQL = await initSqlJs({
        locateFile: file => "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/" + file
    });

    const saved = localStorage.getItem("libraryDB");
    if (saved) {
        /* open the saved database */
        db = new SQL.Database(new Uint8Array(JSON.parse(saved)));
    } else {
        /* first time: create it from database.sql */
        db = new SQL.Database();
        const sql = await fetch("database.sql").then(r => r.text());
        db.run(sql);
        save();
    }
}

/* save the database in the browser */
function save() {
    localStorage.setItem("libraryDB", JSON.stringify(Array.from(db.export())));
}

/* run a SELECT and get the rows */
function select(sql, params = []) {
    const stmt = db.prepare(sql);
    stmt.bind(params);
    const rows = [];
    while (stmt.step()) rows.push(stmt.getAsObject());
    stmt.free();
    return rows;
}

/* run INSERT, UPDATE or DELETE and save */
function change(sql, params = []) {
    db.run(sql, params);
    save();
}

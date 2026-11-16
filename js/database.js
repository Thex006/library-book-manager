/* the 5 tables in the database */
const tables = ["books", "authors", "categories", "readers", "loans"];

/* READ: show every table with all its columns and rows */
function showTables() {
    let html = "";
    for (const table of tables) {
        const rows = select("SELECT * FROM " + table);
        html += `<h3>${table} (${rows.length} rows)</h3><table><tr>`;

        /* column names */
        const columns = rows.length ? Object.keys(rows[0]) : [];
        for (const col of columns) html += `<th>${col}</th>`;
        html += "</tr>";

        /* one row for each record */
        for (const row of rows) {
            html += "<tr>";
            for (const col of columns) html += `<td>${row[col] ?? ""}</td>`;
            html += "</tr>";
        }
        html += "</table>";
    }
    document.getElementById("tables").innerHTML = html;
}

/* download the database as a real library.db file */
document.getElementById("downloadButton").addEventListener("click", function () {
    const file = new Blob([db.export()], { type: "application/octet-stream" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = "library.db";
    link.click();
});

/* start the page */
loadDatabase().then(showTables);

let db;
let editId = null;

/* start: load the database */
async function start() {
    const SQL = await initSqlJs({
        locateFile: file => "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/" + file
    });

    const saved = localStorage.getItem("library");
    if (saved) {
        /* open the saved database */
        db = new SQL.Database(new Uint8Array(JSON.parse(saved)));
    } else {
        /* first time: create the database from database.sql */
        db = new SQL.Database();
        const sql = await fetch("database.sql").then(r => r.text());
        db.run(sql);
        save();
    }
    showBooks();
}

/* save the database in the browser */
function save() {
    localStorage.setItem("library", JSON.stringify(Array.from(db.export())));
}

/* READ: show all books in the table */
function showBooks() {
    const result = db.exec("SELECT * FROM books");
    const rows = result.length ? result[0].values : [];
    let html = "";
    for (const [id, title, author, year] of rows) {
        html += `<tr>
            <td>${title}</td>
            <td>${author}</td>
            <td>${year}</td>
            <td>
                <a href="#" onclick="editBook(${id})">Edit</a>
                <a href="#" class="delete" onclick="deleteBook(${id})">Delete</a>
            </td>
        </tr>`;
    }
    document.getElementById("bookList").innerHTML = html;
}

/* CREATE and UPDATE: when the form is saved */
document.getElementById("bookForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = document.getElementById("year").value;

    if (editId === null) {
        /* CREATE */
        db.run("INSERT INTO books (title, author, year) VALUES (?, ?, ?)", [title, author, year]);
    } else {
        /* UPDATE */
        db.run("UPDATE books SET title = ?, author = ?, year = ? WHERE id = ?", [title, author, year, editId]);
        editId = null;
        document.getElementById("formTitle").textContent = "Add a new book";
    }

    save();
    this.reset();
    showBooks();
});

/* UPDATE: put the book's data in the form */
function editBook(id) {
    const book = db.exec("SELECT * FROM books WHERE id = ?", [id])[0].values[0];
    document.getElementById("title").value = book[1];
    document.getElementById("author").value = book[2];
    document.getElementById("year").value = book[3];
    document.getElementById("formTitle").textContent = "Edit book";
    editId = id;
}

/* DELETE: remove a book */
function deleteBook(id) {
    db.run("DELETE FROM books WHERE id = ?", [id]);
    save();
    showBooks();
}

/* reset: go back to the example books */
document.getElementById("resetButton").addEventListener("click", function () {
    localStorage.removeItem("library");
    location.reload();
});

start();

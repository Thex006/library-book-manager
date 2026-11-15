let editId = null;

/* fill the author and category dropdowns */
function fillDropdowns() {
    let html = "";
    for (const a of select("SELECT * FROM authors")) {
        html += `<option value="${a.id}">${a.name}</option>`;
    }
    document.getElementById("author").innerHTML = html;

    html = "";
    for (const c of select("SELECT * FROM categories")) {
        html += `<option value="${c.id}">${c.name}</option>`;
    }
    document.getElementById("category").innerHTML = html;
}

/* READ: list all books (JOIN gets the author and category names) */
/* a book is "On loan" if today is between the loan date and the return date */
function showList() {
    const rows = select(`
        SELECT books.id, books.title, books.year,
               authors.name AS author, categories.name AS category,
               (SELECT COUNT(*) FROM loans
                WHERE loans.book_id = books.id
                AND loans.loan_date <= date('now')
                AND (loans.return_date = '' OR loans.return_date IS NULL
                     OR loans.return_date >= date('now'))) AS loaned
        FROM books
        LEFT JOIN authors ON books.author_id = authors.id
        LEFT JOIN categories ON books.category_id = categories.id`);
    let html = "";
    for (const b of rows) {
        html += `<tr>
            <td>${b.title}</td>
            <td>${b.author || "-"}</td>
            <td>${b.category || "-"}</td>
            <td>${b.year}</td>
            <td>${b.loaned > 0 ? '<span class="onloan">On loan</span>' : '<span class="available">Available</span>'}</td>
            <td>
                <a href="#" onclick="editItem(${b.id})">Edit</a>
                <a href="#" class="delete" onclick="deleteItem(${b.id})">Delete</a>
            </td>
        </tr>`;
    }
    document.getElementById("list").innerHTML = html;
}

/* CREATE and UPDATE: when the form is saved */
document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const category = document.getElementById("category").value;
    const year = document.getElementById("year").value;

    if (editId === null) {
        /* CREATE */
        change("INSERT INTO books (title, author_id, category_id, year) VALUES (?, ?, ?, ?)",
               [title, author, category, year]);
    } else {
        /* UPDATE */
        change("UPDATE books SET title = ?, author_id = ?, category_id = ?, year = ? WHERE id = ?",
               [title, author, category, year, editId]);
        editId = null;
        document.getElementById("formTitle").textContent = "Add book";
    }
    this.reset();
    showList();
});

/* UPDATE: put the book's data in the form */
function editItem(id) {
    const b = select("SELECT * FROM books WHERE id = ?", [id])[0];
    document.getElementById("title").value = b.title;
    document.getElementById("author").value = b.author_id;
    document.getElementById("category").value = b.category_id;
    document.getElementById("year").value = b.year;
    document.getElementById("formTitle").textContent = "Edit book";
    editId = id;
}

/* DELETE: remove a book */
function deleteItem(id) {
    change("DELETE FROM books WHERE id = ?", [id]);
    showList();
}

/* start the page */
loadDatabase().then(function () {
    fillDropdowns();
    showList();
});

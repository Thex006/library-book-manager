let editId = null;

/* fill the book and reader dropdowns */
function fillDropdowns() {
    let html = "";
    for (const b of select("SELECT * FROM books")) {
        html += `<option value="${b.id}">${b.title}</option>`;
    }
    document.getElementById("book").innerHTML = html;

    html = "";
    for (const r of select("SELECT * FROM readers")) {
        html += `<option value="${r.id}">${r.name}</option>`;
    }
    document.getElementById("reader").innerHTML = html;
}

/* READ: list all loans (JOIN gets the book title and reader name) */
/* a loan is "Returned" when the return date is before today */
function showList() {
    const rows = select(`
        SELECT loans.id, loans.loan_date, loans.return_date,
               books.title AS book, readers.name AS reader,
               (loans.return_date <> '' AND loans.return_date < date('now')) AS returned
        FROM loans
        LEFT JOIN books ON loans.book_id = books.id
        LEFT JOIN readers ON loans.reader_id = readers.id`);
    let html = "";
    for (const l of rows) {
        html += `<tr>
            <td>${l.book || "-"}</td>
            <td>${l.reader || "-"}</td>
            <td>${l.loan_date}</td>
            <td>${l.return_date || "-"}</td>
            <td>${l.returned ? '<span class="available">Returned</span>' : '<span class="onloan">Active</span>'}</td>
            <td>
                <a href="#" onclick="editItem(${l.id})">Edit</a>
                <a href="#" class="delete" onclick="deleteItem(${l.id})">Delete</a>
            </td>
        </tr>`;
    }
    document.getElementById("list").innerHTML = html;
}

/* CREATE and UPDATE: when the form is saved */
document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();
    const book = document.getElementById("book").value;
    const reader = document.getElementById("reader").value;
    const loanDate = document.getElementById("loanDate").value;
    const returnDate = document.getElementById("returnDate").value;

    if (editId === null) {
        /* CREATE */
        change("INSERT INTO loans (book_id, reader_id, loan_date, return_date) VALUES (?, ?, ?, ?)",
               [book, reader, loanDate, returnDate]);
    } else {
        /* UPDATE */
        change("UPDATE loans SET book_id = ?, reader_id = ?, loan_date = ?, return_date = ? WHERE id = ?",
               [book, reader, loanDate, returnDate, editId]);
        editId = null;
        document.getElementById("formTitle").textContent = "Add loan";
    }
    this.reset();
    showList();
});

/* UPDATE: put the loan's data in the form */
function editItem(id) {
    const l = select("SELECT * FROM loans WHERE id = ?", [id])[0];
    document.getElementById("book").value = l.book_id;
    document.getElementById("reader").value = l.reader_id;
    document.getElementById("loanDate").value = l.loan_date;
    document.getElementById("returnDate").value = l.return_date;
    document.getElementById("formTitle").textContent = "Edit loan";
    editId = id;
}

/* DELETE: remove a loan */
function deleteItem(id) {
    change("DELETE FROM loans WHERE id = ?", [id]);
    showList();
}

/* start the page */
loadDatabase().then(function () {
    fillDropdowns();
    showList();
});

let editId = null;

/* READ: list all authors */
function showList() {
    let html = "";
    for (const a of select("SELECT * FROM authors")) {
        html += `<tr>
            <td>${a.name}</td>
            <td>${a.country || "-"}</td>
            <td>
                <a href="#" onclick="editItem(${a.id})">Edit</a>
                <a href="#" class="delete" onclick="deleteItem(${a.id})">Delete</a>
            </td>
        </tr>`;
    }
    document.getElementById("list").innerHTML = html;
}

/* CREATE and UPDATE: when the form is saved */
document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const country = document.getElementById("country").value;

    if (editId === null) {
        /* CREATE */
        change("INSERT INTO authors (name, country) VALUES (?, ?)", [name, country]);
    } else {
        /* UPDATE */
        change("UPDATE authors SET name = ?, country = ? WHERE id = ?", [name, country, editId]);
        editId = null;
        document.getElementById("formTitle").textContent = "Add author";
    }
    this.reset();
    showList();
});

/* UPDATE: put the author's data in the form */
function editItem(id) {
    const a = select("SELECT * FROM authors WHERE id = ?", [id])[0];
    document.getElementById("name").value = a.name;
    document.getElementById("country").value = a.country;
    document.getElementById("formTitle").textContent = "Edit author";
    editId = id;
}

/* DELETE: remove an author */
function deleteItem(id) {
    change("DELETE FROM authors WHERE id = ?", [id]);
    showList();
}

/* start the page */
loadDatabase().then(showList);

let editId = null;

/* READ: list all categories */
function showList() {
    let html = "";
    for (const c of select("SELECT * FROM categories")) {
        html += `<tr>
            <td>${c.name}</td>
            <td>
                <a href="#" onclick="editItem(${c.id})">Edit</a>
                <a href="#" class="delete" onclick="deleteItem(${c.id})">Delete</a>
            </td>
        </tr>`;
    }
    document.getElementById("list").innerHTML = html;
}

/* CREATE and UPDATE: when the form is saved */
document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;

    if (editId === null) {
        /* CREATE */
        change("INSERT INTO categories (name) VALUES (?)", [name]);
    } else {
        /* UPDATE */
        change("UPDATE categories SET name = ? WHERE id = ?", [name, editId]);
        editId = null;
        document.getElementById("formTitle").textContent = "Add category";
    }
    this.reset();
    showList();
});

/* UPDATE: put the category's name in the form */
function editItem(id) {
    const c = select("SELECT * FROM categories WHERE id = ?", [id])[0];
    document.getElementById("name").value = c.name;
    document.getElementById("formTitle").textContent = "Edit category";
    editId = id;
}

/* DELETE: remove a category */
function deleteItem(id) {
    change("DELETE FROM categories WHERE id = ?", [id]);
    showList();
}

/* start the page */
loadDatabase().then(showList);

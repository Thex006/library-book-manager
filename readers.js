let editId = null;

/* READ: list all readers */
function showList() {
    let html = "";
    for (const r of select("SELECT * FROM readers")) {
        html += `<tr>
            <td>${r.name}</td>
            <td>${r.email || "-"}</td>
            <td>${r.phone || "-"}</td>
            <td>
                <a href="#" onclick="editItem(${r.id})">Edit</a>
                <a href="#" class="delete" onclick="deleteItem(${r.id})">Delete</a>
            </td>
        </tr>`;
    }
    document.getElementById("list").innerHTML = html;
}

/* CREATE and UPDATE: when the form is saved */
document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    if (editId === null) {
        /* CREATE */
        change("INSERT INTO readers (name, email, phone) VALUES (?, ?, ?)", [name, email, phone]);
    } else {
        /* UPDATE */
        change("UPDATE readers SET name = ?, email = ?, phone = ? WHERE id = ?",
               [name, email, phone, editId]);
        editId = null;
        document.getElementById("formTitle").textContent = "Add reader";
    }
    this.reset();
    showList();
});

/* UPDATE: put the reader's data in the form */
function editItem(id) {
    const r = select("SELECT * FROM readers WHERE id = ?", [id])[0];
    document.getElementById("name").value = r.name;
    document.getElementById("email").value = r.email;
    document.getElementById("phone").value = r.phone;
    document.getElementById("formTitle").textContent = "Edit reader";
    editId = id;
}

/* DELETE: remove a reader */
function deleteItem(id) {
    change("DELETE FROM readers WHERE id = ?", [id]);
    showList();
}

/* start the page */
loadDatabase().then(showList);

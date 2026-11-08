// 1) Ask "are you sure?" before deleting a book
document.querySelectorAll(".delete-form").forEach(function (form) {
  form.addEventListener("submit", function (e) {
    if (!confirm("Delete this book?")) e.preventDefault();
  });
});

// 2) Live search: hide table rows that don't match the text
var search = document.getElementById("search");
if (search) {
  search.addEventListener("input", function () {
    var text = search.value.toLowerCase();
    document.querySelectorAll("table tr").forEach(function (row, i) {
      if (i === 0) return; // skip the header row
      row.style.display = row.innerText.toLowerCase().includes(text) ? "" : "none";
    });
  });
}

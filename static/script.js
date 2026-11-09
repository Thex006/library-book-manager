document.querySelectorAll(".delete-form").forEach(function (form) {
  form.addEventListener("submit", function (e) {
    if (!confirm("Delete this book?")) e.preventDefault();
  });
});

var search = document.getElementById("search");
if (search) {
  search.addEventListener("input", function () {
    var text = search.value.toLowerCase();
    document.querySelectorAll("table tr").forEach(function (row, i) {
      if (i === 0) return;
      row.style.display = row.innerText.toLowerCase().includes(text) ? "" : "none";
    });
  });
}

/* dark mode switch */
const darkSwitch = document.getElementById("darkSwitch");

/* remember the choice */
if (localStorage.getItem("dark") === "on") {
    document.body.classList.add("dark");
    darkSwitch.checked = true;
}

darkSwitch.addEventListener("change", function () {
    document.body.classList.toggle("dark", darkSwitch.checked);
    localStorage.setItem("dark", darkSwitch.checked ? "on" : "off");
});

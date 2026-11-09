# 📚 Library Book Manager

**Author:** Thierry Chizaram Onuoha
**Course:** Technology and Methodology of System Development (BAI0168)

A simple web application for managing the books of a small library.
It implements **CRUD** (Create, Read, Update, Delete) on books and has a simple web interface.

---

## 👉 Where is the code?

| File | What it contains |
|---|---|
| **[main.py](main.py)** | **The main Python code**: the database and all CRUD operations |
| [templates/index.html](templates/index.html) | Home page: list of all books |
| [templates/form.html](templates/form.html) | Form for adding and editing a book |
| [templates/base.html](templates/base.html) | Shared layout (header) used by every page |
| [static/style.css](static/style.css) | Design (colours, table, buttons) |
| [static/script.js](static/script.js) | JavaScript: live search and delete confirmation |
| [requirements.txt](requirements.txt) | Python packages needed (Flask) |

### CRUD operations in `main.py`
| Operation | Function | What it does |
|---|---|---|
| **Create** | `add()` | Adds a new book (`INSERT`) |
| **Read** | `index()` | Shows all books (`SELECT`) |
| **Update** | `edit()` and `toggle()` | Edits a book / marks it borrowed or available (`UPDATE`) |
| **Delete** | `delete()` | Removes a book (`DELETE`) |

## Technologies
- **Python + Flask**: application logic
- **SQLite**: database (one file, `library.db`, created automatically)
- **HTML, CSS, JavaScript**: user interface
- **Git + GitHub**: version control

---

# User Documentation

## Installation and start
1. Install **Python 3** from https://python.org.
2. Download this project: click the green **Code** button → **Download ZIP**, then unzip it.
3. Open a terminal in the folder that contains `main.py`.
4. Install Flask: `pip install flask`
5. Start the app: `python main.py`
6. Open **http://127.0.0.1:5000** in your browser.

## How to use it

**See all books (Read):** The home page shows the total number of books, how many are available and how many are borrowed, followed by a table of all books. Type in the search box to filter the table.

**Add a book (Create):** Click **+ Add book**, fill in the title, author, genre and year, then click **Save**.

**Edit a book (Update):** Click **Edit** next to a book, change the details, then click **Save**.

**Borrow / return a book (Update):** Click the green **Available** button to mark the book as borrowed. It turns red (**Borrowed**). Click it again when the book is returned.

**Delete a book (Delete):** Click **Delete** next to a book and confirm in the pop-up.

## Troubleshooting
- **`No module named 'flask'`**: run `pip install flask`.
- **`can't open file ... main.py`**: the terminal is in the wrong folder. Use `cd` to go to the folder that contains `main.py`.
- **To start with an empty library:** stop the app and delete `library.db`.

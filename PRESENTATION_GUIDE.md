# Presentation Study Guide — Library Book Manager (15+ min)

## Timing plan
| Min | Part |
|---|---|
| 0–2 | Intro: the problem and what the app does |
| 2–4 | Technologies and why we chose them |
| 4–6 | How a web app works (diagram) + project structure |
| 6–8 | The database table |
| 8–12 | Code walkthrough: one route per CRUD letter |
| 12–14 | Front end: templates, CSS, JavaScript |
| 14–17 | Live demo |
| 17–18 | Git/GitHub + what we'd add next |

If you're presenting as a group of three, give each person about two of these parts.

## 1. The intro — say it in one sentence
"Small libraries often track books on paper or in Excel. Our app lets a librarian add, view, edit,
lend out and delete books from a simple web page, with everything saved in a database."

## 2. Why these technologies?
- **Python** – easy to read, short code.
- **Flask** – a *micro* web framework: one file can be a whole website.
- **SQLite** – the database is one file and comes with Python, so there's no server to install.
- **HTML/CSS/JS** – the standard trio for any web page.
- **Git/GitHub** – version control and teamwork, required by the course.

## 3. How the app works
```
 Browser  ── 1. request (click / form) ──▶  Flask route in app.py
   ▲                                              │ 2. SQL
   │                                              ▼
   └──── 4. HTML page ◀── 3. template + data ── SQLite (library.db)
```
Key words to use: **request**, **route**, **SQL query**, **template**, **response**.

## 4. The database — one table: `books`
| Column | Type | Meaning |
|---|---|---|
| id | INTEGER, primary key, autoincrement | unique number for each book |
| title | TEXT | book title |
| author | TEXT | author name |
| genre | TEXT | category |
| year | INTEGER | year published |
| available | INTEGER | 1 = on the shelf, 0 = borrowed |

SQLite has no true/false type, so we store **1/0**.

## 5. CRUD table (learn this one by heart)
| CRUD | User action | Route | SQL |
|---|---|---|---|
| **C**reate | Add book form | `/add` | `INSERT INTO books ...` |
| **R**ead | Home page list | `/` | `SELECT * FROM books ORDER BY title` |
| **U**pdate | Edit form | `/edit/<id>` | `UPDATE books SET ... WHERE id=?` |
| **U**pdate | Borrow/return button | `/toggle/<id>` | `UPDATE books SET available = 1 - available` |
| **D**elete | Delete button | `/delete/<id>` | `DELETE FROM books WHERE id=?` |

## 6. Code walkthrough (`app.py`, top to bottom)
1. **Imports**: `sqlite3` for the database (built into Python) and `flask` for the web part.
2. **`app = Flask(__name__)`** creates the web app. The `secret_key` is needed for flash messages.
3. **`db()`** opens the database. `row_factory` lets us write `book["title"]` instead of `book[1]`.
4. **`create_table()`** uses `CREATE TABLE IF NOT EXISTS`, so it only creates the table the first time.
5. **`@app.route("/")`** is a *decorator*: it says "when someone visits this URL, run this function."
6. **GET vs POST**:
   - **GET** shows the page.
   - **POST** means a form was submitted.
   - The `add()` and `edit()` functions check `request.method` to tell the two apart.
7. **`request.form["title"]`** reads what the user typed.
8. **`con.commit()`** saves the change. Without it, nothing is stored!
9. **`redirect("/")`** sends the user back to the list after saving.
10. **`flash()`** shows a one-time message like "Book added."
11. **Toggle trick**: `available = 1 - available` flips 1→0 and 0→1 in a single SQL line.

## 7. Front end
- **Templates (Jinja)**:
  - `{{ b.title }}` prints a value.
  - `{% for b in books %}` loops over the books.
  - `{% if %}` chooses what to show.
- **`base.html`** holds the header and layout. The other pages use `{% extends "base.html" %}`, so the header is written only once.
- **`form.html`** is used for both Add and Edit. If a `book` is passed in, the fields are pre-filled.
- **CSS** styles the cards, the table, and the green/red status buttons.
- **JavaScript**:
  - a delete confirmation (`confirm()`, plus `preventDefault()` to cancel the delete)
  - live search, which hides table rows that don't contain the typed text

## 8. Live demo script
1. Run `python app.py` and open the browser.
2. **Add** three books (e.g. *1984 – George Orwell – Fiction – 1949*). → **Create**
3. Show the list and the counters. → **Read**
4. Type "orw" in the search box → the table filters instantly (JavaScript).
5. Click **Available** → it becomes **Borrowed**, and the counters change. → **Update**
6. **Edit** a book's year → Save. → **Update**
7. **Delete** a book → the confirm pop-up appears → the book is gone. → **Delete**

Tip: add a few books *before* presenting, and practise the demo twice.

## 9. Git / GitHub commands
```
git init
git add .
git commit -m "First version of Library Book Manager"
git branch -M main
git remote add origin https://github.com/<username>/library-book-manager.git
git push -u origin main
```
- `.gitignore` keeps `library.db` and `__pycache__` out of the repo.
- Make several small commits, e.g. "add CSS" or "add search". Teachers like a real commit history.

## 10. Questions you might get
- **What is CRUD?**
  - Create, Read, Update, Delete: the four basic operations on stored data.
- **What is the `?` in the SQL?**
  - A placeholder. It protects against **SQL injection**, because user input is never pasted straight into the query.
- **Why POST for delete and not a link?**
  - Changing data should never happen with GET. Otherwise a browser preloading a link could delete a book.
- **Where is the data stored?**
  - In `library.db`, a SQLite file next to `app.py`.
- **What is Flask?**
  - A lightweight Python web framework. It maps URLs to Python functions.
- **What would you add next?**
  - Login for librarians, a members table, due dates and late fees, book cover images.

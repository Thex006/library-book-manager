"""
Library Book Manager
A small web app (Python + Flask + SQLite) to manage the books of a library.
It does CRUD: Create, Read, Update, Delete books.

Run:   pip install flask
       python app.py
Open:  http://127.0.0.1:5000
"""
import sqlite3
from flask import Flask, render_template, request, redirect, flash

app = Flask(__name__)
app.secret_key = "library-secret"     # needed for flash messages
DB = "library.db"
GENRES = ["Fiction", "Science", "History", "Technology", "Children", "Other"]


# ---------- DATABASE ----------
def db():
    """Open a connection to the database file."""
    con = sqlite3.connect(DB)
    con.row_factory = sqlite3.Row     # lets us write book["title"]
    return con


def create_table():
    """Create the books table the first time the app runs."""
    con = db()
    con.execute("""
        CREATE TABLE IF NOT EXISTS books (
            id        INTEGER PRIMARY KEY AUTOINCREMENT,
            title     TEXT NOT NULL,
            author    TEXT NOT NULL,
            genre     TEXT,
            year      INTEGER,
            available INTEGER DEFAULT 1      -- 1 = on the shelf, 0 = borrowed
        )
    """)
    con.commit()
    con.close()


# ---------- READ: list all books ----------
@app.route("/")
def index():
    con = db()
    books = con.execute("SELECT * FROM books ORDER BY title").fetchall()
    con.close()
    borrowed = sum(1 for b in books if b["available"] == 0)
    return render_template("index.html", books=books, borrowed=borrowed)


# ---------- CREATE: add a new book ----------
@app.route("/add", methods=["GET", "POST"])
def add():
    if request.method == "POST":
        f = request.form
        con = db()
        con.execute("INSERT INTO books (title, author, genre, year) VALUES (?, ?, ?, ?)",
                    (f["title"], f["author"], f["genre"], f["year"]))
        con.commit()
        con.close()
        flash("Book added.")
        return redirect("/")
    return render_template("form.html", book=None, genres=GENRES)


# ---------- UPDATE: edit a book ----------
@app.route("/edit/<int:book_id>", methods=["GET", "POST"])
def edit(book_id):
    con = db()
    if request.method == "POST":
        f = request.form
        con.execute("UPDATE books SET title=?, author=?, genre=?, year=? WHERE id=?",
                    (f["title"], f["author"], f["genre"], f["year"], book_id))
        con.commit()
        con.close()
        flash("Book updated.")
        return redirect("/")
    book = con.execute("SELECT * FROM books WHERE id = ?", (book_id,)).fetchone()
    con.close()
    return render_template("form.html", book=book, genres=GENRES)


# ---------- UPDATE: borrow / return a book ----------
@app.route("/toggle/<int:book_id>", methods=["POST"])
def toggle(book_id):
    con = db()
    con.execute("UPDATE books SET available = 1 - available WHERE id = ?", (book_id,))
    con.commit()
    con.close()
    return redirect("/")


# ---------- DELETE: remove a book ----------
@app.route("/delete/<int:book_id>", methods=["POST"])
def delete(book_id):
    con = db()
    con.execute("DELETE FROM books WHERE id = ?", (book_id,))
    con.commit()
    con.close()
    flash("Book deleted.")
    return redirect("/")


if __name__ == "__main__":
    create_table()
    app.run(debug=True)

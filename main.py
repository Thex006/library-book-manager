import sqlite3
from flask import Flask, render_template, request, redirect

app = Flask(__name__)


# connect to the database
def get_db():
    con = sqlite3.connect("library.db")
    con.row_factory = sqlite3.Row
    return con


# create the table from database.sql
def create_table():
    con = get_db()
    con.executescript(open("database.sql").read())
    con.close()


# READ - show all books
@app.route("/")
def index():
    con = get_db()
    books = con.execute("SELECT * FROM books").fetchall()
    con.close()
    return render_template("index.html", books=books)


# CREATE - add a new book
@app.route("/add", methods=["GET", "POST"])
def add():
    if request.method == "POST":
        con = get_db()
        con.execute("INSERT INTO books (title, author, year) VALUES (?, ?, ?)",
                    (request.form["title"], request.form["author"], request.form["year"]))
        con.commit()
        con.close()
        return redirect("/")
    return render_template("add.html")


# UPDATE - edit a book
@app.route("/edit/<int:id>", methods=["GET", "POST"])
def edit(id):
    con = get_db()
    if request.method == "POST":
        con.execute("UPDATE books SET title = ?, author = ?, year = ? WHERE id = ?",
                    (request.form["title"], request.form["author"], request.form["year"], id))
        con.commit()
        con.close()
        return redirect("/")
    book = con.execute("SELECT * FROM books WHERE id = ?", (id,)).fetchone()
    con.close()
    return render_template("edit.html", book=book)


# DELETE - remove a book
@app.route("/delete/<int:id>")
def delete(id):
    con = get_db()
    con.execute("DELETE FROM books WHERE id = ?", (id,))
    con.commit()
    con.close()
    return redirect("/")


# start the website
create_table()
app.run(debug=True)

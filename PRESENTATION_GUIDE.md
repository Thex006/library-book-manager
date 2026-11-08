# Presentation Script — Library Book Manager
**Presenter:** Thierry Chizaram Onuoha · **Length:** about 15–17 minutes

How to use this script:
- **Bold text in brackets** is an action (e.g. switch window, click). Do not read it out.
- Everything else is what you say. Read it slowly and naturally.
- Have two windows ready before you start: VS Code with `app.py` open, and the browser at http://127.0.0.1:5000 (app already running, with 3–4 books added).

---

## PART 1 — Introduction (≈ 2 min)

Good morning everyone. My name is Thierry Onuoha, and today I'm going to present my project for this course: the **Library Book Manager**.

Let me start with the problem. Many small libraries, for example a school library, a club or even a home library, still keep track of their books on paper or in an Excel sheet. That works at first, but after a while it becomes messy. You don't know which books are on the shelf, which ones are borrowed, and finding a book takes time.

So I built a simple web application to solve this. With my app, a librarian can:
- **add** new books,
- **see** all the books in one list,
- **edit** the details of a book,
- mark a book as **borrowed** or **returned**,
- and **delete** books that the library doesn't have anymore.

The task for this course was to build an application that implements **CRUD** operations, has a simple user interface, uses **Git**, and is stored on **GitHub**. My project does all of these, and I will show you how.

---

## PART 2 — What is CRUD? (≈ 1 min)

Before I go into the app, a quick reminder of what CRUD means. CRUD stands for **Create, Read, Update and Delete**. These are the four basic things you can do with data in almost any program.

- **Create** means adding new data. In my app, that's adding a new book.
- **Read** means viewing the data. That's the list of all books.
- **Update** means changing data. That's editing a book, or marking it as borrowed.
- **Delete** means removing data. That's deleting a book.

Almost every application you use (Instagram, Neptun, online shops) is built on these four operations.

---

## PART 3 — Technologies (≈ 2 min)

Now let me talk about the technologies I used, and why I chose them.

For the back end, which is the logic of the application, I used **Python** with **Flask**. Python is easy to read, so the code stays short and clear. Flask is a *micro web framework*. That means it's very small and simple, and one Python file can run a whole website.

For the database I used **SQLite**. The good thing about SQLite is that the whole database is just one file, called `library.db`. It comes built into Python, so I don't need to install or run a separate database server.

For the user interface I used the three standard web technologies:
- **HTML** for the structure of the pages,
- **CSS** for the design and colours,
- and **JavaScript** for two small interactive features, which I'll show you in the demo.

And finally, I used **Git** for version control and **GitHub** to store the source code online.

---

## PART 4 — How the app works (≈ 2 min)

Let me explain how the application works in general. It follows the usual flow of a web application, and it happens in four steps.

**One:** the user does something in the browser, for example clicks the "Add book" button and fills in a form. The browser sends a **request** to my Flask application.

**Two:** Flask looks at the address of the request and finds the matching **route**. A route is simply a Python function connected to a web address. For example, the address `/add` runs the function called `add`.

**Three:** that function talks to the **database** using **SQL**, for example to insert a new book or to read all books.

**Four:** Flask puts the data into an **HTML template** and sends the finished page back to the browser as a **response**.

So in short: **browser → Flask route → database → HTML page back to the browser.**

**[Switch to VS Code and show the file list on the left.]**

Here you can see the structure of the project. It's quite small:
- `app.py` contains all the Python logic.
- The `templates` folder contains the HTML pages. There are three: `base.html` is the shared layout with the header, `index.html` is the book list, and `form.html` is the form for adding and editing.
- The `static` folder contains `style.css` for the design and `script.js` for the JavaScript.
- `README.md` is the user documentation, and `requirements.txt` lists the Python packages needed, which is only Flask.

---

## PART 5 — The database (≈ 1.5 min)

**[Scroll to the `create_table` function in app.py.]**

The database has one table, called `books`. Here is the SQL that creates it. Each book has six columns:
- **id**: a unique number for each book. It's the **primary key**, and it's **autoincrement**, so the database gives each new book the next number automatically.
- **title** and **author**: text.
- **genre**: for example Fiction, Science or History.
- **year**: the year the book was published.
- **available**: this tells us if the book is on the shelf or borrowed. SQLite doesn't have a true/false type, so I store **1** for available and **0** for borrowed.

I wrote `CREATE TABLE IF NOT EXISTS`, so the table is only created the first time the app runs. After that, the existing data is kept.

---

## PART 6 — The code, one CRUD operation at a time (≈ 4 min)

Now let's go through the code. I'll show one function for each letter of CRUD.

**[Scroll to the top: imports and `db()`.]**

At the top I import `sqlite3` for the database, and from Flask I import the tools I need. Then I create the app with `Flask(__name__)`.

The function `db()` opens a connection to the database file. The line with `row_factory` lets me write `book["title"]` instead of `book[1]`, which makes the code easier to read.

**[Scroll to `index()`.]**

**Read.** This is the home page. The line `@app.route("/")` is called a **decorator**. It tells Flask: when someone visits the main address, run this function. Inside, I run `SELECT * FROM books ORDER BY title`, which gets all books sorted by title. I also count how many books are borrowed. Then `render_template` sends the books to the HTML page.

**[Scroll to `add()`.]**

**Create.** This function handles adding a book. It accepts two methods, **GET** and **POST**.
- **GET** means the user just opened the page, so I show the empty form.
- **POST** means the user submitted the form.

In that case I read the values with `request.form`, and I run an `INSERT INTO books` query.

Notice the **question marks** in the SQL. They are **placeholders**. The real values are passed separately. This is important for security because it prevents **SQL injection**: a user can't type SQL code into the form and break the database.

After inserting, `con.commit()` saves the change. Without commit, nothing would be saved. Then `flash` shows a message "Book added", and `redirect` sends the user back to the list.

**[Scroll to `edit()`.]**

**Update.** Editing works almost the same way. The address contains the book's id, for example `/edit/3`. With GET, I load that book from the database and show the form already filled in. With POST, I run an `UPDATE` query with `WHERE id = ?`, so only that one book is changed.

**[Scroll to `toggle()`.]**

There is a second update: borrowing and returning. I used a small trick here: `available = 1 - available`. If the value is 1, then 1 minus 1 is 0, so the book becomes borrowed. If it's 0, then 1 minus 0 is 1, so it becomes available again. One line of SQL does both directions.

**[Scroll to `delete()`.]**

**Delete.** Finally, deleting runs `DELETE FROM books WHERE id = ?`. I made delete a **POST** request and not a normal link on purpose. Actions that change data should never happen with a simple link, because browsers or bots can open links automatically.

**[Scroll to the bottom.]**

At the bottom, when I run the file, it first creates the table and then starts the web server.

---

## PART 7 — The front end (≈ 1.5 min)

**[Open `templates/index.html`.]**

The HTML pages use **Jinja templates**, which come with Flask.
- Double curly brackets, like `{{ b.title }}`, print a value from Python.
- `{% for b in books %}` is a loop, so the table creates one row for every book.
- `{% if %}` lets me show a green "Available" button or a red "Borrowed" button.

All pages start with `extends "base.html"`. This means the header and layout are written only once and reused on every page.

**[Open `templates/form.html`.]**

I also used **one form for both adding and editing**. If a book is given to the template, the fields are filled in and the title says "Edit book". If not, the form is empty and says "Add a new book". This avoids writing the same form twice.

**[Open `static/script.js`.]**

The JavaScript does two things:
1. When you click Delete, it shows a **confirmation pop-up**. If you click Cancel, `preventDefault` stops the form, so nothing is deleted.
2. The **live search**: every time you type, it checks each row of the table and hides the rows that don't contain your text. This happens instantly in the browser, without reloading the page.

---

## PART 8 — Live demo (≈ 3 min)

Now let me show you the application working.

**[Switch to the browser.]**

This is the home page. At the top you can see three counters: the total number of books, how many are available, and how many are borrowed. Below is the table with all the books. This is the **Read** operation.

**[Click "+ Add book". Type: 1984 / George Orwell / Fiction / 1949. Click Save.]**

Now I'll add a new book. I click "Add book", fill in the title, author, genre and year, and click Save. You can see the message "Book added", and the book is now in the list. The counter also went up. That's **Create**.

**[Type "orw" in the search box, then clear it.]**

Now the search. If I type "orw", the table immediately shows only the books that match. That's the JavaScript live search.

**[Click the green "Available" button on 1984.]**

Now let's say someone borrows this book. I click "Available" and it changes to a red "Borrowed". The counters update too. If I click it again, the book is returned. That's an **Update**.

**[Click "Edit" on a book, change the year, Save.]**

I can also edit a book. I click Edit, and the form is already filled in. I change the year and save, and the table is updated. That's also **Update**.

**[Click "Delete" on a book → the pop-up appears → click OK.]**

And finally, delete. I click Delete, the confirmation pop-up appears, I click OK, and the book is removed. That's **Delete**.

So you've now seen all four CRUD operations working.

---

## PART 9 — Git and GitHub (≈ 1 min)

**[Optional: open your GitHub repository page in the browser.]**

During development I used **Git** for version control. Git saves snapshots of the project called **commits**, so I can see the history of my changes and go back if something breaks.

The project is stored on **GitHub**. Here you can see the repository with all the files and the commit history.

I also added a `.gitignore` file, which tells Git not to upload the database file and Python's temporary files. Only the source code belongs in the repository.

The repository also contains a `README` file. That is the **user documentation**: it explains how to install the app, how to start it, and how to use every feature.

---

## PART 10 — Conclusion (≈ 1 min)

To finish, here's a short summary. I built the Library Book Manager, a web application that:
- implements all four **CRUD** operations on books,
- has a simple and usable interface with search and borrow tracking,
- stores its data in an **SQLite** database,
- and is version-controlled with **Git** and stored on **GitHub**, with user documentation.

If I continued this project, I would add:
- a **login** for librarians,
- a table for **library members**, so we know *who* borrowed each book,
- **due dates** and reminders for late books,
- and **book cover images**.

Thank you for listening. I'm happy to answer any questions.

---

## BACKUP — Answers to possible questions

These are for you only; don't read them in the presentation.

- **"What is Flask?"**
  - A lightweight Python web framework. It connects web addresses to Python functions, which we call routes.
- **"Why SQLite and not MySQL?"**
  - For a small app, SQLite is enough. It needs no server, the database is one file, and it's built into Python. For a big library with many users I would switch to MySQL or PostgreSQL.
- **"What is the difference between GET and POST?"**
  - GET asks for a page. POST sends data to the server, for example when a form is submitted. Anything that changes data should use POST.
- **"What are the question marks in your SQL?"**
  - Placeholders. They keep user input separate from the SQL command, which protects against SQL injection.
- **"What does `commit()` do?"**
  - It saves the changes to the database file permanently.
- **"What is a primary key?"**
  - A column that uniquely identifies each row. Here, it's the id.
- **"What happens if two people use it at once?"**
  - SQLite handles it fine for a small number of users. For many users I would use a bigger database.
- **"Why one table only?"**
  - The app only manages books, so one table is enough. If I added members, I'd make a second table and link them with a foreign key.
- **If you don't know an answer, you can say:**
  - "That's a good question. I haven't implemented that yet, but I would look into it as a next step."

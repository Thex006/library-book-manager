# Library Book Manager

Made by Thierry Chizaram Onuoha for the Technology and Methodology of System Development course (BAI0168).

This is a simple website for managing the books in a library. You can add a book, see all books, edit a book and delete a book. These are the CRUD operations (Create, Read, Update, Delete).

## The code

- [templates/index.html](templates/index.html) - home page with the list of books
- [templates/add.html](templates/add.html) - page to add a book
- [templates/edit.html](templates/edit.html) - page to edit a book
- [static/style.css](static/style.css) - the design of the website
- [database.sql](database.sql) - the SQL code for the database (the table and some example books)
- [library.db](library.db) - the database file itself
- [main.py](main.py) - connects the website to the database

CRUD:

- Create - add.html and add() in main.py (INSERT)
- Read - index.html and index() in main.py (SELECT)
- Update - edit.html and edit() in main.py (UPDATE)
- Delete - the Delete link and delete() in main.py (DELETE)

## Technologies used

- HTML
- CSS
- SQL (SQLite database)
- Python and Flask (to connect the pages to the database)
- Git and GitHub

## How to run it

1. Install Python 3
2. Download this project (Code -> Download ZIP) and unzip it
3. Open a terminal in the folder where main.py is
4. Run `pip install flask`
5. Run `python main.py`
6. Open http://127.0.0.1:5000 in your browser

## The database

The database is SQLite, so it is just one file: library.db. It is in this repository.

You can see what is in it in two ways:

- Open [database.sql](database.sql) here on GitHub. It shows the SQL that creates the books table and adds the example books.
- Download library.db and open it with DB Browser for SQLite (free, https://sqlitebrowser.org) to see the table and the data.

If library.db is deleted, main.py makes a new one from database.sql when you start it.

## Why localhost?

When you run the app, it opens at http://127.0.0.1:5000. This is called localhost.

- Localhost means "this computer". The website runs on my own laptop, not on the internet.
- 5000 is the port, like a door number that Flask uses for the website.
- I used localhost because this is a school project. It is the normal way to build and test a website before putting it online.
- It is free, it needs no server or domain, and it works without internet.
- The database is a local file too, so nobody else can change the data.
- To put it online later, I could upload it to a hosting service (for example PythonAnywhere or Render). Then it would get a real web address instead of localhost.

## How to use it

- See the books: the home page shows all books in a table.
- Add a book: click "Add book", fill in the title, author and year, and click Save.
- Edit a book: click Edit next to a book, change what you want, and click Save changes.
- Delete a book: click Delete next to the book.

## Problems

- If you get "No module named flask", run `pip install flask`.
- If you get "can't open file main.py", you are in the wrong folder in the terminal.
- To start again with only the example books, delete the library.db file and run main.py again.

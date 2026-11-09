# Library Book Manager

Made by Thierry Chizaram Onuoha for the Technology and Methodology of System Development course (BAI0168).

This is a simple website for managing the books in a library. You can add a book, see all books, edit a book and delete a book. These are the CRUD operations (Create, Read, Update, Delete).

## The code

- [templates/index.html](templates/index.html) - home page with the list of books
- [templates/add.html](templates/add.html) - page to add a book
- [templates/edit.html](templates/edit.html) - page to edit a book
- [static/style.css](static/style.css) - the design of the website
- [database.sql](database.sql) - the SQL code for the database table
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

The database file (library.db) is created automatically the first time you run it.

## How to use it

- See the books: the home page shows all books in a table.
- Add a book: click "Add book", fill in the title, author and year, and click Save.
- Edit a book: click Edit next to a book, change what you want, and click Save changes.
- Delete a book: click Delete next to the book.

## Problems

- If you get "No module named flask", run `pip install flask`.
- If you get "can't open file main.py", you are in the wrong folder in the terminal.
- To start with an empty library, delete the library.db file.

# Library Book Manager

Made by Thierry Chizaram Onuoha for the Technology and Methodology of System Development course (BAI0168).

This is a small web app for managing the books in a library. You can add books, see them in a list, edit them, mark them as borrowed or returned, and delete them. So it covers all the CRUD operations (Create, Read, Update, Delete).

## The code

- [main.py](main.py) - the main Python code (database and all CRUD functions)
- [templates](templates) - the HTML pages
- [static/style.css](static/style.css) - the design
- [static/script.js](static/script.js) - JavaScript for the search box and the delete confirmation

CRUD in main.py:

- Create - add()
- Read - index()
- Update - edit() and toggle()
- Delete - delete()

## Technologies used

- Python and Flask
- SQLite database
- HTML, CSS and JavaScript
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

- See the books: the home page shows all books in a table, and how many are available or borrowed. You can type in the search box to find a book.
- Add a book: click "+ Add book", fill in the title, author, genre and year, and click Save.
- Edit a book: click Edit next to a book, change what you want, and click Save.
- Borrow or return a book: click the green Available button and it changes to Borrowed. Click it again when the book is returned.
- Delete a book: click Delete next to the book and confirm.

## Problems

- If you get "No module named flask", run `pip install flask`.
- If you get "can't open file main.py", you are in the wrong folder in the terminal.
- To start with an empty library, delete the library.db file.

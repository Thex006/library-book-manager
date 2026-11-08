# Library Book Manager — User Documentation

## What is this?
A small web application for managing the books of a library. It supports full **CRUD**
(Create, Read, Update, Delete) on books and has a simple web interface.
Made for *Technology and Methodology of System Development* (BAI0168).

## Requirements
- Python 3 (https://python.org)
- Flask (installed in step 3 below)

## Installation and start
1. Download the project: `git clone <your-repo-url>` then `cd library-book-manager`
2. (Optional) create a virtual environment: `python -m venv venv`
3. Install Flask: `pip install -r requirements.txt`
4. Start the app: `python app.py`
5. Open **http://127.0.0.1:5000** in your browser.

The database file `library.db` is created automatically the first time.

## How to use it

### See all books (Read)
The home page shows three counters (total, available, borrowed) and a table of all books, sorted by title.
Type in the **search box** to filter the table instantly by title, author or genre.

### Add a book (Create)
Click **+ Add book** in the top-right corner. Fill in title, author, genre and year, then click **Save**.

### Edit a book (Update)
Click **Edit** next to a book, change the details, click **Save**. **Cancel** returns without changes.

### Borrow / return a book (Update)
Click the green **Available** button to mark the book as borrowed. It turns red (**Borrowed**).
Click it again when the book comes back.

### Delete a book (Delete)
Click **Delete** next to a book and confirm in the pop-up. The book is removed permanently.

## Project structure
```
library-book-manager/
├── app.py              # Python logic: database + routes (pages)
├── requirements.txt    # needed packages (flask)
├── templates/
│   ├── base.html       # shared layout (header, messages)
│   ├── index.html      # book list
│   └── form.html       # add / edit form (one form for both)
└── static/
    ├── style.css       # design
    └── script.js       # live search + delete confirmation
```

## Troubleshooting
- **`ModuleNotFoundError: No module named 'flask'`** → run `pip install flask`.
- **Port 5000 already in use** → close the other program, or change the last line to `app.run(debug=True, port=5001)`.
- **Start with an empty library** → stop the app and delete `library.db`.

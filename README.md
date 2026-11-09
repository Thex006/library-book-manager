# Library Book Manager

Made by Thierry Chizaram Onuoha for the Technology and Methodology of System Development course (BAI0168).

This is a simple website for managing the books in a library. You can add a book, see all books, edit a book and delete a book. These are the CRUD operations (Create, Read, Update, Delete).

Live website: https://thex006.github.io/library-book-manager/

## The code

- [index.html](index.html) - the page: the form and the table of books
- [style.css](style.css) - the design of the website
- [database.sql](database.sql) - the SQL code for the database (the table and some example books)
- [app.js](app.js) - runs the SQL when you click the buttons

CRUD:

- Create - INSERT INTO books
- Read - SELECT * FROM books
- Update - UPDATE books SET ... WHERE id = ?
- Delete - DELETE FROM books WHERE id = ?

## Technologies used

- HTML
- CSS
- SQL (SQLite)
- a small JavaScript file to run the SQL
- Git and GitHub (GitHub Pages hosts the website)

## The database

The database is SQLite. It runs inside the browser using a library called sql.js.

- The first time you open the site, the database is created from [database.sql](database.sql), which has the table and 4 example books.
- After that, the database is saved in your browser, so your changes stay when you reload the page.
- The "Reset database" button deletes your changes and starts again from database.sql.

## How to run it

Just open the live website: https://thex006.github.io/library-book-manager/

No installing is needed. GitHub Pages hosts it for free, so it is not on localhost.

## How to use it

- See the books: all books are shown in the table.
- Add a book: fill in the title, author and year at the top, and click Save.
- Edit a book: click Edit next to a book. Its data goes into the form. Change it and click Save.
- Delete a book: click Delete next to the book.
- Reset: click "Reset database" to go back to the example books.

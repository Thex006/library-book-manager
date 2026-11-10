# Library Management System

Made by Thierry Chizaram Onuoha for the Technology and Methodology of System Development course (BAI0168).

This is a simple website for managing a library. You can manage books, authors, categories, readers and loans. For each one you can add, list, edit and delete, which are the CRUD operations (Create, Read, Update, Delete).

Live website: https://thex006.github.io/library-book-manager/

User documentation: [User_Documentation.pdf](User_Documentation.pdf)

## The code

Pages (HTML):

- [index.html](index.html) - Books page (home page)
- [authors.html](authors.html) - Authors page
- [categories.html](categories.html) - Categories page
- [readers.html](readers.html) - Readers page
- [loans.html](loans.html) - Loans page

Design (CSS):

- [style.css](style.css) - the design of all pages

Database (SQL):

- [database.sql](database.sql) - creates the 5 tables and adds example data

JavaScript (runs the SQL):

- [db.js](db.js) - shared code: loads and saves the database
- [books.js](books.js), [authors.js](authors.js), [categories.js](categories.js), [readers.js](readers.js), [loans.js](loans.js) - the CRUD code for each page

## Database tables

- authors - id, name, country
- categories - id, name
- books - id, title, author_id, category_id, year
- readers - id, name, email, phone
- loans - id, book_id, reader_id, loan_date, return_date

A book is linked to an author and a category. A loan is linked to a book and a reader.

## CRUD

Every page does the same four things:

- Create - INSERT INTO ...
- Read - SELECT ... FROM ...
- Update - UPDATE ... SET ... WHERE id = ?
- Delete - DELETE FROM ... WHERE id = ?

## Technologies used

- HTML
- CSS
- SQL (SQLite, running in the browser with sql.js)
- JavaScript (small files that run the SQL)
- Git and GitHub (GitHub Pages hosts the website)

## How to run it

Open the live website: https://thex006.github.io/library-book-manager/

No installing is needed.

The first time, the database is created from database.sql. After that it is saved in your browser, so changes stay when you reload. The "Reset database" button goes back to the example data.

## How to use it

- Use the menu at the top to go to Books, Authors, Categories, Readers or Loans.
- Add: fill in the form and click Save.
- List: everything is shown in the table under the form.
- Edit: click Edit next to a row. The data goes into the form. Change it and click Save.
- Delete: click Delete next to a row.

/* AUTHORS table */
CREATE TABLE authors (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    name    TEXT NOT NULL,
    country TEXT
);

/* CATEGORIES table */
CREATE TABLE categories (
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

/* BOOKS table (linked to an author and a category) */
CREATE TABLE books (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL,
    author_id   INTEGER REFERENCES authors(id),
    category_id INTEGER REFERENCES categories(id),
    year        INTEGER
);

/* READERS table (library members) */
CREATE TABLE readers (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    name  TEXT NOT NULL,
    email TEXT,
    phone TEXT
);

/* LOANS table (which reader borrowed which book) */
CREATE TABLE loans (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id     INTEGER REFERENCES books(id),
    reader_id   INTEGER REFERENCES readers(id),
    loan_date   TEXT,
    return_date TEXT
);

/* example authors */
INSERT INTO authors (name, country) VALUES ('George Orwell', 'United Kingdom');
INSERT INTO authors (name, country) VALUES ('Chinua Achebe', 'Nigeria');
INSERT INTO authors (name, country) VALUES ('J. R. R. Tolkien', 'United Kingdom');
INSERT INTO authors (name, country) VALUES ('J. K. Rowling', 'United Kingdom');

/* example categories */
INSERT INTO categories (name) VALUES ('Fiction');
INSERT INTO categories (name) VALUES ('Fantasy');
INSERT INTO categories (name) VALUES ('Classic');

/* example books */
INSERT INTO books (title, author_id, category_id, year) VALUES ('1984', 1, 3, 1949);
INSERT INTO books (title, author_id, category_id, year) VALUES ('Things Fall Apart', 2, 1, 1958);
INSERT INTO books (title, author_id, category_id, year) VALUES ('The Hobbit', 3, 2, 1937);
INSERT INTO books (title, author_id, category_id, year) VALUES ('Harry Potter and the Philosopher''s Stone', 4, 2, 1997);

/* example readers */
INSERT INTO readers (name, email, phone) VALUES ('Anna Kovacs', 'anna@example.com', '+36 30 123 4567');
INSERT INTO readers (name, email, phone) VALUES ('Peter Nagy', 'peter@example.com', '+36 20 765 4321');

/* example loans */
INSERT INTO loans (book_id, reader_id, loan_date, return_date) VALUES (1, 1, '2026-11-01', '2026-11-15');
INSERT INTO loans (book_id, reader_id, loan_date, return_date) VALUES (3, 2, '2026-11-05', '2026-11-19');

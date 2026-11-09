/* Table that stores the books */
CREATE TABLE books (
    id     INTEGER PRIMARY KEY AUTOINCREMENT,
    title  TEXT NOT NULL,
    author TEXT NOT NULL,
    year   INTEGER
);

/* Example books */
INSERT INTO books (title, author, year) VALUES ('1984', 'George Orwell', 1949);
INSERT INTO books (title, author, year) VALUES ('Things Fall Apart', 'Chinua Achebe', 1958);
INSERT INTO books (title, author, year) VALUES ('The Hobbit', 'J. R. R. Tolkien', 1937);
INSERT INTO books (title, author, year) VALUES ('Harry Potter and the Philosopher''s Stone', 'J. K. Rowling', 1997);

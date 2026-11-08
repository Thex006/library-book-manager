# Library Book Manager

## Author
- Thierry Chizaram Onuoha (individual project)

## Project Description
The Library Book Manager is a web application that helps a small library (school, club or home library) keep track of its books.
The librarian can add books, see all books in one list, edit book details, mark books as borrowed or returned, and delete books.

## Book Information
Each book stores:
- Title
- Author
- Genre (Fiction, Science, History, Technology, Children, Other)
- Year of publication
- Status (Available / Borrowed)

## CRUD Operations
**Create**
- Add a new book to the library.

**Read**
- View all books in a table.
- See totals: number of books, available books, borrowed books.
- Search books by title or author.

**Update**
- Edit a book's title, author, genre or year.
- Mark a book as Borrowed or Available with one click.

**Delete**
- Remove a book from the library (with a confirmation pop-up).

## Main Pages
1. Book List page (home page with statistics and search)
2. Add Book page
3. Edit Book page

## Technologies
- Python + Flask – application logic (back end)
- SQLite – database that stores the books
- HTML – structure of the web pages
- CSS – design and styling
- JavaScript – live search and delete confirmation
- Git – version control
- GitHub – source code repository

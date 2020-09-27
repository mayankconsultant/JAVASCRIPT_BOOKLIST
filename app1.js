class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//Store class

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") == null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn_var) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      // console.log(book.isbn);
      // console.log(isbn_var);
      if (book.isbn === isbn_var) {
        console.log("Deleting");
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

class UI {
  static displayBooks() {
    // const storedBooks = [
    //   {
    //     title: "Lucky Seven",
    //     author: "Unknown",
    //     isbn: "456",
    //   },
    //   {
    //     title: "Famous Five",
    //     author: "Grid Baylton",
    //     isbn: "789",
    //   },
    // ];

    const books = Store.getBooks();

    books.forEach((book) => UI.addBooktoList(book));
  }

  // Add  book to STorage

  static addBooktoList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement(`tr`);
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a> </td>
    `;
    list.appendChild(row);
  }

  //delete book

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearfileds() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

  static showalert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    //Vanish after  3 seconds

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }
}

//EVENT  LOAD

document.addEventListener("DOMContentLoaded", UI.displayBooks());

document.addEventListener("DOMContentLoaded", () => {
  console.log("This Page is Loaded");
});

document.querySelector("#book-form").addEventListener("submit", (e) => {
  //prevent defualt action
  e.preventDefault();
  //get form values
  const title = document.querySelector("#title").value;

  const author = document.querySelector("#author").value;

  const isbn = document.querySelector("#isbn").value;

  //Validate

  if (title == "" || author == "" || isbn == "") {
    UI.showalert("Please fill in all fields", "Danger");
  } else {
    const book = new Book(title, author, isbn);

    console.log(book);

    //Add Book to UI

    UI.addBooktoList(book);
    Store.addBook(book);
    UI.showalert("Book Added", "success");
    //clear  fields

    UI.clearfileds();
  }

  //Initiate the Book
});

// Event : Remove a Book
document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);

  // console.log(e.target);
  // console.log(e.target.parentElement.previousElementSibling.textContent);

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  UI.showalert("Book Deleted", "success");
});

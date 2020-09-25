//Book Class:represents book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
//UI Class: user Interface
class UI{
  static displayBooks(){
    const storedBooks=[
      {
        title="Lucky Seven",
        author="Unknown",
        isbn="456"
      },
      {
        title="Famous Five",
        author="Grid Baylton",
        isbn="789"
      },
    ];
    const books=storedBooks;
  
    books.forEach( (book)=>UI.addBooktoList(book));
  }

  static addBooktoList(book){
    const list=document.querySelector('#book-list');
    const row = document.createElement(`tr`);
    row.innerHTML=`
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a> </td>
    `;
    list.appendChild(row);
  };
 
};

// document.addEventListener("DOMContentLoaded", alert("jj"));
//Store class : local storage

//Events :
// Display Books
// document.addEventListener('DOMContentLoaded',alert('hello'));
// document.addEventListener("DOMContentLoaded",alert("jj"));


// Add Book
// Remove Book

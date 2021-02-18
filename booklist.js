class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}
class UI{
    static displaybooks(){
        const books=Store.getBooks();
    

        // books.forEach((book)=>UI.addBookToList(book))

        // this works similar to 

        for (var book of books){            //const books is above
            UI.addBookToList(book);
        }
    }

    static addBookToList(book) {
        
        const list=document.querySelector('#book-list');  

        const row=document.createElement('tr');

        row.innerHTML=` <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td> <a href="" class="btn btn-danger btn-sm delete"</a> X </td>`;

        list.appendChild(row);

}
static deleteBook(el){
    console.log(el);
    if(el.classList.contains('delete')){
        el.parentElement.parentElement.remove();
    }
}

static showAlert(message, className) {                                     //alert
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    //vanishes in 3 secs
    setTimeout(() => document.querySelector('.alert').remove(), 3000);

}


static clearfields(){
    document.querySelector('#title').value='';
    document.querySelector('#author').value='';
    document.querySelector('#isbn').value='';

}

}

//Store Class : Handles Storage
class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(isbn) {
      const books = Store.getBooks();
  
      books.forEach((book, index) => {
        if(book.isbn === isbn) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  //

//display books
document.addEventListener('DOMContentLoaded', UI.displaybooks);

document.querySelector('#book-form').addEventListener('submit', function(e){                   /////////
    e.preventDefault();

    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const isbn=document.querySelector('#isbn').value;


    //validate alert 
    if(title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all fields', 'danger');     //if i will put success here instead of danger...it'll be green,info is blue
      } 
      else { 
          
        const book=new Book(title,author,isbn);

        UI.addBookToList(book);     //add book to UI


        Store.addBook(book);          //add book to local storage

       

        UI.showAlert('Book Added', 'success');                             //msg of book added

        UI.clearfields();   // make  clearfields function above
      }
});                                                                                              ///////

//remove
document.querySelector('#book-list').addEventListener('click',(e)=>
{
    e.preventDefault();
    UI.deleteBook(e.target);    //remove book from ui

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);        //remove book from local storage

    UI.showAlert('Book Deleted','success');
});

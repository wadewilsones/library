const form = document.querySelector('form');
const addBookBtn = document.querySelector('#submit');
const bookContainer = document.querySelector('section');

let favoriteBooks = [];

addBookBtn.addEventListener('click', addBook);

window.onload = () => {
    setStorage();
    displayBooks()
}

//Prototype of a book

class Books {
    constructor(name, author){
        this.bookName = name;
        this.author = author;
    }
}


/*Add books to array*/

function addBook(event){
    event.preventDefault();

    const bookName = document.getElementById('bookName').value;
    const bookAuthor = document.getElementById('author_name').value;
    //Create a new instance of a class
    let newBook = new Books(bookName, bookAuthor)
    //Push to array & add to Storage
    favoriteBooks.push(newBook);
    localStorage.setItem('BookList', JSON.stringify(favoriteBooks));
    //Display and Refresh
    cleanUI();
    displayBooks();
}


//Add to local Storage
function setStorage(){
  
    let dataFromStorage = window.localStorage.getItem('BookList');
    if(dataFromStorage != []){
        favoriteBooks = JSON.parse(dataFromStorage);
        console.log(favoriteBooks);
    }


}


/*Display books */

function displayBooks(){

    if(favoriteBooks.length > 0){
        favoriteBooks.forEach(element => {
            let book = document.createElement('div');
            book.innerHTML = `
            <h3>Book Title: ${element.bookName}</h3>
            <h4>Author:${element.author}</h4>
            <button id = 'removeBook'>Remove book</button>`;
            bookContainer.append(book);
        });

    }
}

/*Clean UI */

function cleanUI(){
    bookContainer.innerHTML = '';
}



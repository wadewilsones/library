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
    let bookName = document.getElementById('bookName').value;
    let bookAuthor = document.getElementById('author_name').value;
    //Validate input
    if(bookName != '' && bookAuthor != ''){
        //Create a new instance of a class
        let newBook = new Books(bookName, bookAuthor)
        //Push to array & add to Storage
        favoriteBooks.push(newBook);
        localStorage.setItem('BookList', JSON.stringify(favoriteBooks));
        //Display and Refresh
        cleanUI();
        displayBooks();
    }

    else{
        //Handle wrong input
        let bookName = document.getElementById('bookName');
        let bookAuthor = document.getElementById('author_name');

        //Change style of input
        bookName.removeAttribute('class', 'Wrong-input');
        bookAuthor.setAttribute('class', 'Wrong-input');
        bookName.setAttribute('class', 'Wrong-input');
        bookAuthor.setAttribute('class', 'Wrong-input');

        //Change value
        bookName.value = 'Your forgot a book name!';
        bookAuthor.value = 'No author?';

        setTimeout( () => {
            bookName.value = '';
            bookAuthor.value = '';
        }, 2000)
    }

}


//Add to local Storage
function setStorage(){
  
    let dataFromStorage = window.localStorage.getItem('BookList');
    if(dataFromStorage != []){
        favoriteBooks = JSON.parse(dataFromStorage);
    }


}


/*Display books */

function displayBooks(){

    if(favoriteBooks.length > 0){
        favoriteBooks.forEach(element => {
            let bookId = element.bookName;
            let book = document.createElement('div');
            book.innerHTML = `
            <h3>${element.bookName}</h3>
            <h4>By: ${element.author}</h4>
            <button class = 'removeBtn' id = "${element.bookName}" onClick = "removeBook(event)">Remove book</button>`;
            bookContainer.append(book);
        });

    }
}

/*Remove book*/


function removeBook(e){
    let book = e.target.getAttribute('id');
    //Find a book in favorites books
    let newBookList = favoriteBooks.filter(element => element.bookName != book)
    favoriteBooks = newBookList;
    console.log(favoriteBooks);
    localStorage.setItem('BookList', JSON.stringify(favoriteBooks));
    cleanUI();
    displayBooks();
}

/*Clean UI */

function cleanUI(){
    bookContainer.innerHTML = '';
}



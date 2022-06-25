const form = document.querySelector('form');
const addBookBtn = document.querySelector('#submit');
const bookContainer = document.querySelector('section');

let favoriteBooks = [];


addBookBtn.addEventListener('click', addBook);

window.onload = () => {

        setStorage();
        displayBooks();
    }

//Prototype of a book

class Books {
    constructor(name, author){
        this.bookName = name;
        this.author = author;
        this.status = 'Unread';
    }

}


/*Add books to array*/

function addBook(event){
    event.preventDefault();
    let bookName = document.getElementById('bookName');
    let bookAuthor = document.getElementById('author_name');

    //Validate input
    if(bookName.value != '' && bookAuthor.value != ''){

        bookName.removeAttribute('class', 'Wrong-input');
        bookName.setAttribute('class', 'Bookinput');

        bookAuthor.removeAttribute('class', 'Wrong-input');
        bookAuthor.setAttribute('class', 'Bookinput');

        //Create a new instance of a class
        let newBook = new Books(bookName.value, bookAuthor.value)
        //Push to array & add to Storage
        favoriteBooks.push(newBook);
        localStorage.setItem('BookList', JSON.stringify(favoriteBooks));
        //Display and Refresh
        cleanUI();
        displayBooks();
        bookName.value = '';
        bookAuthor.value = '';
    }
    // Handle wron input
    else {

        //If author field is empty
        if (bookName.value != '' && bookAuthor.value == ''){

            bookAuthor.removeAttribute('class', 'Bookinput'); // new style was applied
            bookAuthor.setAttribute('class', 'Wrong-input');

            bookAuthor.placeholder = 'Author name required!';
        }

        //If book name field is empty
        else if (bookName.value == '' && bookAuthor.value != ''){

            bookName.removeAttribute('class', 'Bookinput'); // new style was applied
            bookName.setAttribute('class', 'Wrong-input');
            bookName.placeholder = 'Book name required!';
        }

            bookName.removeAttribute('class', 'Bookinput');
            bookName.setAttribute('class', 'Wrong-input');

            bookAuthor.removeAttribute('class', 'Bookinput');
            bookAuthor.setAttribute('class', 'Wrong-input');
            //Change placeholder for inputs
            bookName.placeholder = 'Book name required!';
            bookAuthor.placeholder = 'Author name required!';
        }
    }


//Add to local Storage
function setStorage(){
    if(window.localStorage.getItem('BookList') != null){
        let storageData = window.localStorage.getItem('BookList')
        favoriteBooks = JSON.parse(storageData);
    }
    else{
        localStorage.setItem('BookList', JSON.stringify(favoriteBooks));
    }

}

/*Display books */

function displayBooks(){

    if(favoriteBooks.length > 0){

        favoriteBooks.forEach(element => {
            let book = document.createElement('div');
            book.innerHTML = `
            <i class="fa fa-times removeBtn" aria-hidden="true" id = "${element.bookName}" onClick = "removeBook(event)"></i>
            <h3>${element.bookName}</h3>
            <h4>By: ${element.author}</h4>`
            if(element.status == 'none'){
                book.innerHTML += `<button class = 'readStatusBtn' id = "r-${element.bookName}"onClick = "markRead(event)">Mark as Read</button>`;
            }
            else{
                book.innerHTML += `<button class = 'unreadStatusBtn' id = "r-${element.bookName}"onClick = "markRead(event)">Mark as Unread</button>`;
            }
           
            bookContainer.append(book);
        });

    }
}

/*Mark book as read*/

function markRead(e){
    let book = e.target.getAttribute('id');
    book = book.slice(2,(book.length)); // get book-name part from id
    let newArray = favoriteBooks.filter(element => element.bookName == book);

    if(newArray[0].status != 'read'){
        newArray[0].status = 'read';
        localStorage.setItem('BookList', JSON.stringify(favoriteBooks));
    }
    else{
        newArray[0].status = 'none';
        localStorage.setItem('BookList', JSON.stringify(favoriteBooks));
    }
    cleanUI();
    displayBooks();

}

/*Remove book*/


function removeBook(e){
    let book = e.target.getAttribute('id');
    //Find a book in favorites books
    let newBookList = favoriteBooks.filter(element => element.bookName != book)
    favoriteBooks = newBookList;
    localStorage.setItem('BookList', JSON.stringify(favoriteBooks));
    cleanUI();
    displayBooks();
}



/*Clean UI */

function cleanUI(){
    bookContainer.innerHTML = '';
}



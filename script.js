let myLibrary = [1,2,3];

function Book (title, author, pages, pagesRead, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.pagesRead = pagesRead;
    this.isRead = isRead
}

function addBookToLibrary() { 
    
    const mainContainer = document.querySelector('.main-container')

    for (let book in myLibrary) {
        let bookDiv = document.createElement('div')
        bookDiv.classList.add('book')
        bookDiv.innerText = book
        mainContainer.appendChild(bookDiv)
    }
}

addBookToLibrary();
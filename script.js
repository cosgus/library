function Book (title, author, pages, pagesRead, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.pagesRead = pagesRead;
    this.isRead = isRead
}

function createImgDiv(book) {

    let imgDiv = document.createElement('div');
    imgDiv.classList.add('img-container');

    img = document.createElement('img');
    img.classList.add('book-img');

    title = book.title;
    terms = String(title.split(' '));
    url = `https://source.unsplash.com/500x250?${terms}`;

    img.src = url;

    imgDiv.appendChild(img);

    return imgDiv;
}

function createMenuDiv(book) {

    const menuDiv = document.createElement('div')
    menuDiv.classList.add('book-menu')

    const editButton = document.createElement('span')
    editButton.innerText = "edit"
    editButton.classList.add("material-icons", "book-button", 'edit')

    const deleteButton = document.createElement('span')
    deleteButton.innerText = "delete"
    deleteButton.classList.add("material-icons", "book-button", 'delete')

    const pagesReadDiv = document.createElement('div')
    pagesReadDiv.innerText = `${book.pagesRead} pages read`
    pagesReadDiv.classList.add('pages-read')

    menuDiv.appendChild(editButton)
    menuDiv.appendChild(pagesReadDiv)
    menuDiv.appendChild(deleteButton)
    
    // Pick up here - add buttons and stuff to book nav menu 
    
    return menuDiv

}

function createContentDiv(book) {
    
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('book-content');

    const titleContent = document.createElement('h2');
    titleContent.innerText=book.title;
    titleContent.classList.add('title');

    const authorContent = document.createElement('p');
    authorContent.innerText = `by ${book.author}`;
    authorContent.classList.add('author', 'sub-book-content');

    const pagesContent = document.createElement('p');
    pagesContent.innerText = `${book.pages} pages`;
    pagesContent.classList.add('pages', 'sub-book-content');

    contentDiv.appendChild(titleContent);
    contentDiv.appendChild(authorContent);
    contentDiv.appendChild(pagesContent);

    return contentDiv;
}

function addBookToLibrary(book) { 
    
    const mainContainer = document.querySelector('.book-shelf');

    const bookDiv = document.createElement('div');

    bookDiv.classList.add('book');
    bookDiv.id = book;
    bookDiv.style.display='flex';
    bookDiv.style.flexDirection = 'column';
    
    const imgDiv = createImgDiv(book);
    const contentDiv = createContentDiv(book);
    const menuDiv = createMenuDiv(book);

    bookDiv.appendChild(imgDiv);
    bookDiv.appendChild(contentDiv)
    bookDiv.appendChild(menuDiv)

    mainContainer.appendChild(bookDiv);
    
}


const book1 = new Book('A Brief History of Time', 'Stephen Hawking', 500, 200, false)
const book2 = new Book('Atomic Habits', 'James Clear',250, 0, false)
const book3 = new Book('Stock Market Techniques', 'Richard D. Wyckoff', 95, 20, false)
let myLibrary = []

myLibrary.push(book2)
myLibrary.push(book1)
myLibrary.push(book3)

myLibrary.forEach(book => addBookToLibrary(book));

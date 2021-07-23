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

    const addButton = document.createElement('span')
    addButton.innerText = "add"
    addButton.classList.add("material-icons", "book-button", 'add')

    const subtractButton = document.createElement('span')
    subtractButton.innerText = "remove"
    subtractButton.classList.add("material-icons", "book-button", 'subtract')

    const pagesReadDiv = document.createElement('div')
    pagesReadDiv.innerText = `${book.pagesRead} pages read`
    pagesReadDiv.classList.add('pages-read')

    menuDiv.appendChild(subtractButton)
    menuDiv.appendChild(pagesReadDiv)
    menuDiv.appendChild(addButton)
    
    
    return menuDiv

}

function createContentDiv(book) {
    
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('book-content');

    const titleContent = document.createElement('h3');
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

function createFooterDiv() {

    const footerDiv = document.createElement('div')
    footerDiv.classList.add('book-footer')
    const editButton = document.createElement('span')
    const deleteButton = document.createElement('span')

    editButton.innerText= 'edit';
    editButton.classList.add('edit-button', 'material-icons');

    deleteButton.innerText = 'delete';
    deleteButton.classList.add('delete-button', 'material-icons')

    footerDiv.appendChild(editButton);
    footerDiv.appendChild(deleteButton);

    return footerDiv;
}

function closeForm() {
    document.querySelector('.form-container').style.display='none';
    document.querySelector('.main-container').style.display='flex';
}

function submitForm() {

    document.querySelector('.main-container').style.display='flex';

    const title = document.getElementById("title-form").value
    const author = document.getElementById('author-form').value
    const pages = document.getElementById('pages-form').value
    const pagesRead = document.getElementById('pages-read-form').value

    const book = new Book(title, author, pages,pagesRead,true)

    console.log(book)
    addBookToLibrary(book)

    closeForm()
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
    const footerDiv = createFooterDiv();

    bookDiv.appendChild(imgDiv);
    bookDiv.appendChild(contentDiv);
    bookDiv.appendChild(menuDiv);
    bookDiv.appendChild(footerDiv);

    mainContainer.appendChild(bookDiv);
    
}




let myLibrary = []
const addBookButton = document.querySelector('.add-book')
myLibrary.forEach(book => addBookToLibrary(book));

addBookButton.addEventListener('click', () => {
    document.querySelector('.form-container').style.display='block';
    document.querySelector('.main-container').style.display='none';
    // const book = new Book(title, author, pages, pagesRead, true)
    // addBookToLibrary(book)
})



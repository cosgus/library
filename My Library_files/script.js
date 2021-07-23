function generateId() {
    if (myLibrary.length === 0) {
        return 1;
    }
    else {
        let max = 0;
        myLibrary.forEach(book => max = book.id > max ? book.id : max)
        return max+1;
    }
}

class Book {
    constructor(title, author, pages, pagesRead, isRead) {

        this.id = generateId();
        console.log(this.id);
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.pagesRead = pagesRead;
        this.isRead = isRead;
    }
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
    addButton.classList.add("material-icons", "book-button", 'modifier', 'add')

    const subtractButton = document.createElement('span')
    subtractButton.innerText = "remove"
    subtractButton.classList.add("material-icons", "book-button", 'modifier' ,'subtract')

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
    editButton.classList.add('book-button','edit-button', 'material-icons');

    deleteButton.innerText = 'delete';
    deleteButton.classList.add('book-button','delete-button', 'material-icons')

    footerDiv.appendChild(editButton);
    footerDiv.appendChild(deleteButton);

    return footerDiv;
}




function submitForm() {

    document.querySelector('.add-book').style.display='flex';

    const title = document.getElementById("title-form").value
    const author = document.getElementById('author-form').value
    const pages = document.getElementById('pages-form').value
    const pagesRead = document.getElementById('pages-read-form').value

    const book = new Book(title, author, pages,pagesRead,true)

    myLibrary.push(book)
    myLibrary.forEach(book => addBookToLibrary(book))
    document.querySelector('body').style.justifyContent='space-evenly';
    resetForm();
    closeForm();
}

function alreadyAdded(newBook) {
    const bookshelf = document.querySelector('.book-shelf');
    const nodes = bookshelf.childNodes;
    const books = Array.from(nodes)
    books.shift()

    if (books.length === 0) {
        return false;
    }
    for (let book in books) {
        if (books[book].id == newBook.id) {
            return true;
        }
    }

    return false;
}

function removeBookMyLibrary(id) {
    myLibrary = myLibrary.filter(book => book.id != id);
}

function deleteCard(e) {
    const bookDiv = e.target.parentNode.parentNode
    const bookshelf = bookDiv.parentNode
    bookshelf.removeChild(bookDiv)
    removeBookMyLibrary(bookDiv.id);
}

function createDeleteListeners() {
    // console.log('create delete listeners');
    const deleteButtons = document.querySelectorAll('.delete-button');
    // console.log(deleteButtons);
    deleteButtons.forEach(button => button.addEventListener('click', deleteCard));
}

function createPagesReadListeners() {
    // console.log('create pages-read listeners')
    const modifierButtons = document.querySelectorAll('.modifier')
    
    modifierButtons.forEach(button => button.addEventListener('click', modifyPagesRead))
}

function modifyPagesRead(e) {
    const bookDiv = e.target.parentNode.parentNode
    pagesReadDiv = bookDiv.querySelector('.pages-read')
    pagesRead = pagesReadDiv.innerText.split(' ')[0]
    console.log(Number(pagesRead))

    if (e.target.innerText == 'add') {
        pagesReadDiv.innerText = `${Number(pagesRead)+1} pages read`
    }
    else if (e.target.innerText === 'remove') {
        pagesReadDiv.innerText = `${Number(pagesRead)-1} pages read`
    }
    console.log(e.target.innerText)
}

function getBook(id) {
    const book = myLibrary.find(book => book.id == id);
    return book;
}

function commitChanges(e) {

    const bookDiv = document.querySelector('.modifying')
    console.log(bookDiv)
    const title = document.getElementById("title-form").value
    const author = document.getElementById('author-form').value
    const pages = document.getElementById('pages-form').value
    const pagesRead = document.getElementById('pages-read-form').value

    bookDiv.querySelector('.title').innerText = title;
    bookDiv.querySelector('.author').innerText = author
    bookDiv.querySelector('.pages').innerText = pages
    bookDiv.querySelector('.pages-read').innerText = `${pagesRead} pages read`

    bookDiv.classList.remove('.modifying')

    resetForm();
    closeForm();
    
}

function modifyBook(e) {

    const form = document.querySelector('.form-container')
    form.querySelector('h2').innerText='Edit Book';
    form.style.display='block'

    const submitButton = document.querySelector('.submit')
    submitButton.removeEventListener('click', submitForm)// = 'submitForm()' // Toggles event listener off
    submitButton.addEventListener('click', commitChanges)
    submitButton.innerText = "Save Changes"
    
    const bookDiv = e.target.parentNode.parentNode
    const id = bookDiv.id
    const book = getBook(id);


    bookDiv.classList.add('modifying')

    form.querySelector('#title-form').value = book.title
    form.querySelector('#author-form').value = book.author
    form.querySelector('#pages-form').value = book.pages
    form.querySelector('#pages-read-form').value = book.pagesRead

}


function closeForm() {
    const form = document.querySelector('.form-container')

    form.style.display='none';
    form.querySelector('h2').innerText='Add a Book';
    form.querySelector('.submit').innerText = 'Submit'
    form.querySelector('.submit').addEventListener('click', submitForm)

    resetForm();
}


function createEditListeners() {
    const editButtons = document.querySelectorAll('.edit-button')
    editButtons.forEach(button => button.addEventListener('click', modifyBook))
}

function createBookEventListeners() {

    console.log('create listeners')
    createDeleteListeners();
    createEditListeners();
    createPagesReadListeners();
}

function addBookToLibrary(book) { 
    
    let flag = alreadyAdded(book);

    if (!flag) {

        const mainContainer = document.querySelector('.book-shelf');

        const bookDiv = document.createElement('div');

        bookDiv.classList.add('book');
        bookDiv.id = book.id;
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
        createBookEventListeners();
    }

}

function resetForm() {
    console.log('resetting form')
    const formDiv = document.querySelector('.form-container')
    document.querySelector('.submit').onclick = 'submitForm()' // Toggles event listener off
    console.log(formDiv)
    formDiv.querySelector('#title-form').value = '';
    formDiv.querySelector('#author-form').value = '';
    formDiv.querySelector('#pages-form').value = '';
    formDiv.querySelector('#pages-read-form').value = '';
}


let myLibrary = []
const addBookButton = document.querySelector('.add-book')
myLibrary.forEach(book => addBookToLibrary(book));
document.querySelector('.submit').addEventListener('click', submitForm);

addBookButton.addEventListener('click', () => {
    document.querySelector('.form-container').style.display='block';
    // document.querySelector('.add-book').style.display='none';
    // const book = new Book(title, author, pages, pagesRead, true)
    // addBookToLibrary(book)
})





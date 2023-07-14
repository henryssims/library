let library = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;    
    }

    toggleRead() {
        this.read = !this.read;
    }
}

const container = document.getElementById("container");
const addBook = document.getElementById("add-book");
const bookForm = document.getElementById("book-form");
const formBackground = document.getElementById("form-background");

addBook.addEventListener("click", displayForm);
bookForm.addEventListener("submit", addToLibrary);

if (JSON.parse(localStorage.getItem('library')) != null) {
    let items = JSON.parse(localStorage.getItem('library'));
    for (const item of items) {
        let newBook = new Book(item.title, item.author, item.pages, item.read);
        library.push(newBook);
    }
}
displayLibrary(library);

function displayForm() {
    formBackground.style.display = "block";
}

function addToLibrary(event) {
    event.preventDefault();
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").checked;
    let newBook = new Book(title, author, pages, read);
    library.push(newBook);
    localStorage.setItem('library', JSON.stringify(library));
    formBackground.style.display = "none";
    displayLibrary(library);
    bookForm.reset();
}

function displayLibrary(library) {
    container.innerHTML = "";
    library.forEach(book => {
        const div = document.createElement("div");
        container.appendChild(div);

        const title = document.createElement("h2");
        title.textContent = book.title;
        div.appendChild(title);

        const author = document.createElement("h2");
        author.textContent = book.author;
        div.appendChild(author);

        const pages = document.createElement("h2");
        pages.textContent = book.pages + " pages";
        div.appendChild(pages);

        const read = document.createElement("button");
        read.textContent = "read";
        if (book.read) {
            read.classList.add("read");
        } else {
            read.classList.add("unread");
        } 
        read.addEventListener("click", () => {
            toggleRead(library.indexOf(book));
        });
        div.appendChild(read);

        const remove = document.createElement("button");
        remove.textContent = "remove";
        remove.addEventListener("click", () => {
            removeBook(library.indexOf(book));
        });
        div.appendChild(remove);
    });
}

function removeBook(index) {
    library.splice(index, 1);
    localStorage.setItem('library', JSON.stringify(library));
    displayLibrary(library);
}

function toggleRead(index) {
    library[index].toggleRead();
    localStorage.setItem('library', JSON.stringify(library));
    displayLibrary(library);
}
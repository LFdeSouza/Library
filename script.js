// define book
function Book(title, author, pageNum, readStatus) {
  this.title = title;
  this.author = author;
  this.pageNum = pageNum;
  this.readStatus =
    readStatus === "read"
      ? '<ion-icon class="read-icon" name="checkmark-sharp"></ion-icon>'
      : '<ion-icon class="not-read-icon" name="close"></ion-icon>';
}

//Storage handling
let library = !localStorage.books ? [] : JSON.parse(localStorage.books);

// Load books upon loading
window.addEventListener("load", (event) => {
  library.forEach((book) => {
    displayBooks(book);
  });
});

function addBookToStorage(newBook) {
  let storedBooks = !localStorage.books ? [] : JSON.parse(localStorage.books);
  storedBooks.push(newBook);
  localStorage.books = JSON.stringify(storedBooks);
}

function removeBookFromStorage(book) {
  // let storedBooks = JSON.parse(localStorage.books);
  // storedBooks.push(newBook);
  // localStorage.books = JSON.stringify(storedBooks);
}

function displayBooks(book) {
  const bookList = document.querySelector("#book-list");

  const bookRow = document.createElement("tr");

  bookRow.innerHTML = `<th>${book.title}</th>
                       <td>${book.author}</td>
                       <td>${book.pageNum}</td>
                       <td>${book.readStatus}</td>
                       <td><ion-icon class="delete-icon" name="trash"></ion-icon></td>`;

  bookList.appendChild(bookRow);
}

//Event: create new book upon submition
const form = document.querySelector(".entry-fields");
form.addEventListener("submit", (e) => {
  //prevent default submit behavior
  e.preventDefault();

  // Get data and create book
  const title = document.querySelector("#book-title").value;
  const author = document.querySelector("#book-author").value;
  const pages = document.querySelector("#book-pages").value;
  const readStatus = document.querySelector("#checkbox").checked
    ? "read"
    : "unread";

  const newBook = new Book(title, author, pages, readStatus);
  addBookToStorage(newBook);
  displayBooks(library);
  clearFields();
});

function clearFields() {
  document.querySelector("#book-title").value = "";
  document.querySelector("#book-author").value = "";
  document.querySelector("#book-pages").value = "";
  document.querySelector("#checkbox").checked = false;
}

// Event: Remove Book
const removeButton = document.querySelectorAll("#book-list");
removeButton.forEach((button) =>
  button.addEventListener("click", (e) => {
    //Remove from list
    if (e.target.classList.contains("delete-icon")) {
      console.log(e.target);
      e.target.parentElement.parentElement.remove();
      // Remove from storage
    }
  })
);

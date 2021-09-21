// define book
function Book(title, author, pageNum, readStatus) {
  this.title = title;
  this.author = author;
  this.pageNum = pageNum;
  this.readStatus =
    readStatus === "read"
      ? '<ion-icon class="status read-icon" name="checkmark-sharp"></ion-icon>'
      : '<ion-icon class="status not-read-icon" name="close"></ion-icon>';
}

//Storage handling
let library = !localStorage.books ? [] : JSON.parse(localStorage.books);

// Load books upon loading
window.addEventListener("load", (e) => displayBooks());

function addBook(newBook) {
  library.push(newBook);
  updateStorage();
}

function removeBook(titleToDelete) {
  const storedBooks = JSON.parse(localStorage.books);
  library = storedBooks.filter((book) => book.title !== titleToDelete);
  updateStorage();
}

function updateStorage() {
  localStorage.books = JSON.stringify(library);
}

function toggleStatus(bookToModify) {
  const index = library.findIndex((book) => book.title === bookToModify);
  if (
    library[index].readStatus ===
    '<ion-icon class="status read-icon" name="checkmark-sharp"></ion-icon>'
  ) {
    library[index].readStatus =
      '<ion-icon class="status not-read-icon" name="close"></ion-icon>';
  } else {
    library[index].readStatus =
      '<ion-icon class="status read-icon" name="checkmark-sharp"></ion-icon>';
  }

  updateStorage();
}

function displayBooks() {
  const bookTable = document.querySelector("#book-list");
  bookTable.innerHTML = ""; //reset table

  for (book of library) {
    const bookRow = document.createElement("tr");

    bookRow.innerHTML = `<th>${book.title}</th>
                       <td>${book.author}</td>
                       <td>${book.pageNum}</td>
                       <td>${book.readStatus}</td>
                       <td><ion-icon class="delete-icon" name="trash"></ion-icon></td>`;

    bookTable.appendChild(bookRow);
  }
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
  if (validatePageInput(newBook)) {
    addBook(newBook);
    displayBooks();
    clearFields();
    displaySuccessMsg();
  } else {
    displayAlert();
  }
});

function clearFields() {
  document.querySelector("#book-title").value = "";
  document.querySelector("#book-author").value = "";
  document.querySelector("#book-pages").value = "";
  document.querySelector("#checkbox").checked = false;
}

// Event: Remove Book
const removeButton = document.querySelector("#book-list");
removeButton.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-icon")) {
    removeBook(e.target.parentElement.parentElement.firstChild.innerHTML);
    displayBooks();
  }
});

// Event: Toggle read status
const statusButton = document.querySelector("#book-list");
statusButton.addEventListener("click", (e) => {
  if (e.target.classList.contains("status")) {
    toggleStatus(e.target.parentElement.parentElement.firstChild.innerHTML);
    displayBooks();
  }
});

//Alerts
function validatePageInput(book) {
  if (
    book.title.trim() === "" ||
    book.author.trim() === "" ||
    book.pageNum === ""
  ) {
    console.log(book.author);
    return false;
  } else if (isNaN(book.pageNum)) {
    return false;
  }
  return true;
}

function displayAlert() {
  console.log("failed");
  const alert = document.createElement("div");
  alert.classList.add("alert", "error");
  alert.textContent = "Please enter the fields correctly";
  document.body.appendChild(alert);
  setTimeout(() => document.querySelector(".alert").remove(), 2000);
}

function displaySuccessMsg() {
  const alert = document.createElement("div");
  alert.classList.add("alert", "success");
  alert.textContent = "Book added Succesfully";
  document.body.appendChild(alert);
  setTimeout(() => document.querySelector(".alert").remove(), 2000);
}

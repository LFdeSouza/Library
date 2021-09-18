function Book(title, author, pageNum, readStatus) {
  this.title = title;
  this.author = author;
  this.pageNum = pageNum;
  this.readStatus =
    readStatus === "read"
      ? '<ion-icon class="read-icon" name="checkmark-sharp"></ion-icon>'
      : '<ion-icon class="not-read-icon" name="close"></ion-icon>';
}

function addBook(newBook) {
  const bookList = document.querySelector("[data-book-list]");

  const bookRow = document.createElement("tr");

  bookRow.innerHTML = `<th>${newBook.title}</th>
                       <td>${newBook.author}</td>
                       <td>${newBook.pageNum}</td>
                       <td>${newBook.readStatus}</td>
                       <td><ion-icon class="delete-icon" name="trash"></ion-icon></td>`;

  bookList.appendChild(bookRow);
}

//create new book upon submition
const form = document.querySelector(".entry-fields");
form.addEventListener("submit", (e) => {
  //prevent default submit behavior
  e.preventDefault();

  //get data and create book
  const title = document.querySelector("#book-title").value;
  const author = document.querySelector("#book-author").value;
  const pages = document.querySelector("#book-pages").value;
  const readStatus = document.querySelector("#checkbox").checked
    ? "read"
    : "unread";

  console.log(title, author, pages, readStatus);
  const newBook = new Book(title, author, pages, readStatus);
  console.log(newBook);
  addBook(newBook);
});

const book1 = Book("Eye of the world", "Robert Jordan", 832, "read");
window.localStorage.setItem(1, book1);

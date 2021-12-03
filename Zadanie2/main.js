// *** HTLM ELEMENTS & SETUP***
const btnSubmit = document.getElementById("submit");
const form = document.getElementById("form");
const btnReset = document.getElementById("reset");
const titleEl = document.getElementById("title");
const authorEl = document.getElementById("author");
const errorAuthorEl = document.getElementById("invalidAuthor");
const errorTitleEl = document.getElementById("invalidTitle");
const booksListElement = document.getElementsByClassName("list-container")[0];

window.onload = () => {
  const booksData = readFromLocalStorage();
  booksData ? renderingList(booksData) : null;
};

// *** VARIABLES ***
const booksList = [];
let stateInStorage = localStorage.getItem("books") ? true : false;
let validForm;
let authorMessage = [];
let titleMessage = [];

// *** LOCAL STORAGE ***
const addToLocalStorage = (item) => {
  let newItem = [];
  console.log(stateInStorage);
  if (stateInStorage) {
    newItem = [...readFromLocalStorage(), ...item];
  } else {
    newItem = [...item];
  }

  localStorage.setItem("books", JSON.stringify(newItem));
};
const readFromLocalStorage = () => {
  const res = localStorage.getItem("books");
  return res ? JSON.parse(res) : null;
};

// *** BOOKS STATE ***
const addBook = (data) => {
  const newBook = {
    title: data[0].value,
    author: data[1].value,
    priority: data[2].value,
    category: data[3].value,
  };
  booksList.push(newBook);
  addToLocalStorage(booksList);
  renderingList(booksList);
};

// *** HTML SCRIPTS ***
const validateAuthor = (author) => {
  let res = false;
  if (author.length >= 3) {
    res = true;
  } else {
    res = false;
    authorMessage.push("Autor musi mieć conajmniej 3 litery!");
    errorAuthorEl.style.display = "block";
  }
  return res;
};
const validateTitle = (title) => {
  let res = false;
  if (title.length >= 1) {
    res = true;
  } else {
    res = false;
    titleMessage.push("Tytuł musi mieć conajmniej 1 literę!");
    errorTitleEl.style.display = "block";
  }
  return res;
};
const validateForm = () => {
  const title = validateTitle(titleEl.value);
  const author = validateAuthor(authorEl.value);
  return title && author;
};

const resetForm = (data) => {
  data[0].value = "";
  data[1].value = "";
  data[2].value = "1";
  data[3].value = "Kryminał";
  errorTitleEl.style.display = "none";
  errorAuthorEl.style.display = "none";
};

const renderingList = (booksList) => {
  let listElement = null;

  booksListElement.innerHTML = null; //RESET

  listElement = document.createElement("ul");

  listElement.className = "list";
  booksListElement.appendChild(listElement);
  booksList.map((book) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <div class="title">
      <span>Tytuł:</span><span class="data">${book.title}</span>
    </div>
    <div class="author">
      <span>Autor:</span><span class="data">${book.author}</span>
    </div>
    <div class="priority">
      <span>Priorytet:</span><span class="data">${book.priority}</span>
    </div>
    <div class="category">
      <span>Kategoria:</span><span class="data">${book.category}</span>
    </div>`;

    listElement.appendChild(li);
  });
};

const submitForm = (e) => {
  e.preventDefault();
  console.log(e.target);
  validForm = validateForm();
  if (validForm) {
    addBook(e.target);
    window.location.reload();
    console.log("Valid data send");
  } else {
    console.log("Invalid Data");
  }
};

// *** FUNCTIONS & EVENTS ***
form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitForm(e);
  console.log(titleEl, authorEl);
});

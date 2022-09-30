const bookList = document.getElementById('book-list');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const bookAdd = document.getElementById('book-add');

class Booklibrary {
  constructor() {
    this.books = [
      {
        title: 'Ghost',
        author: 'Sidney Sheldon',
      },
      {
        title: 'The Naked Face',
        author: 'Sidney Sheldon',
      },
    ];
  }
  // add books

  addBook(title, author) {
    this.books.push({
      title,
      author,
    });

    bookAuthor.value = '';
    bookTitle.value = '';
    this.setLocalStorage();
    this.displayBooks();
  }

  removeBook(index) {
    this.books.splice(index, 1);
    this.setLocalStorage();
    this.displayBooks();
  }

  setLocalStorage() {
    localStorage.setItem('localLibraries', JSON.stringify(this.books));
  }

  getLocalStorage() {
    if (localStorage.getItem('localLibraries')) {
      this.books = JSON.parse(localStorage.getItem('localLibraries'));
    }
    this.displayBooks();
  }

  displayBooks() {
    bookList.innerHTML = '';
    this.books.forEach((book, index) => {
      const h3 = document.createElement('div');
      h3.classList.add('book-div');
      const bookNames = document.createElement('p');
      const removeBtn = document.createElement('button');
      bookNames.textContent = ` "${book.title}" by ${book.author}`;

      removeBtn.textContent = 'Remove';
      removeBtn.classList.add('remove');
      h3.append(bookNames, removeBtn);
      removeBtn.addEventListener('click', () => {
        this.removeBook(index);
      });
      bookList.appendChild(h3);
    });
  }
}
const allLibrary = new Booklibrary();
bookAdd.addEventListener('click', (e) => {
  e.preventDefault();
  allLibrary.addBook(bookTitle.value, bookAuthor.value);
});

document.addEventListener('DOMContentLoaded', () => {
  allLibrary.getLocalStorage();
});

const time = document.querySelector('.time');
const date = document.querySelector('.date');

function formatTime(date) {
  const hour = date.getHours() % 12 || 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  let state;

  if (date.getHours() < 12) {
    state = 'am';
  } else {
    state = 'pm';
  }

  return `${hour.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${state}`;
}

function formatDate(date) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  let state;

  switch (day) {
    case 1:
      state = 'st';
      break;
    case 2:
      state = 'nd';
      break;
    default:
      state = 'th';
      break;
  }

  return `${months[month]} ${day}${state} ${year},`;
}

setInterval(() => {
  const today = new Date();

  time.textContent = formatTime(today);
  date.textContent = formatDate(today);
}, 1000);

function SwitchPage(pageId) {
  const currentPage = document.querySelector('.pages .page.is-active');
  currentPage.classList.remove('is-active');

  const nextPage = document.querySelector(`.pages .page[data-page="${pageId}"]`);
  nextPage.classList.add('is-active');
}

window.onload = () => {
  const tabSwitchers = document.querySelectorAll('[data-switcher]');

  for (let i = 0; i < tabSwitchers.length; i += 1) {
    const tabSwitcher = tabSwitchers[i];
    const pageId = tabSwitcher.dataset.tab;

    tabSwitcher.addEventListener('click', () => {
      document.querySelector('.tabs .tab.is-active').classList.remove('is-active');
      tabSwitcher.parentNode.classList.add('is-active');

      SwitchPage(pageId);
    });
  }
};
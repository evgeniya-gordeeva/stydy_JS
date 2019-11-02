'use strict';

let books = document.querySelector('.books');
let booksElem = document.querySelectorAll('.book');

//console.log(booksElem);

// Восстановить порядок книг.
books.insertBefore(booksElem[1], booksElem[0]);
books.insertBefore(booksElem[4], booksElem[2]);
books.removeChild(booksElem[2]);
books.appendChild(booksElem[2]);

// Заменить картинку заднего фона на другую из папки image
document.body.setAttribute('style', 'background-image: url(./image/you-dont-know-js.jpg)');

// Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
booksElem[4].getElementsByTagName('a')[0].innerText = 'Книга 3. this и Прототипы Объектов';

// Удалить рекламу со страницы
document.body.removeChild(document.querySelector('.adv'));

// Восстановить порядок глав во второй и пятой книге
let book2List = booksElem[0].getElementsByTagName('ul')[0];
let book2ListItems = booksElem[0].getElementsByTagName('ul')[0].children;
book2List.insertBefore(book2ListItems[6], book2ListItems[4]);
book2List.insertBefore(book2ListItems[8], book2ListItems[5]);
book2List.insertBefore(book2ListItems[2], book2ListItems[10]);

let book5List = booksElem[5].getElementsByTagName('ul')[0];
let book5ListItems = booksElem[5].getElementsByTagName('ul')[0].children;
book5List.insertBefore(book5ListItems[9], book5ListItems[2]);
book5List.insertBefore(book5ListItems[3], book5ListItems[7]);
book5List.insertBefore(book5ListItems[5], book5ListItems[9]);

// в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
let book6List = booksElem[2].getElementsByTagName('ul')[0];
let book6ListItems = booksElem[2].getElementsByTagName('ul')[0].children;

let newElem = document.createElement('li');
newElem.textContent = 'Глава 8: За пределами ES6';

book6List.insertBefore(newElem, book6ListItems[9]);












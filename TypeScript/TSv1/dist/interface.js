"use strict";
//INTERFACES
//// una interface es una "Estructura" de datos, con la cual se va a trabajar, la cual es obligatoria usar
/// si los onjetos creados son del tipo de la interface creada
const book = {
    id: 1,
    title: 'Only Wolf',
    author: 'Gio'
};
const books = []; // array tipo Book
function getBook() {
    return { id: 1, title: 'Only Wolf', author: 'Gio' };
}
const myBook = getBook();
function createBook(book) {
    return book;
}
const newBook = {
    id: 1,
    title: 'Only Wolf',
    author: 'Gio',
    coAuthor: 'Arbey'
};
createBook(newBook);

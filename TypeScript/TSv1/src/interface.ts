//INTERFACES
//// una interface es una "Estructura" de datos, con la cual se va a trabajar, la cual es obligatoria usar
/// si los onjetos creados son del tipo de la interface creada

interface Book{
    id: number;
    title: string;
    author: string;
    coAuthor?: string; // si lleva "?" es OPCIONAL
    isLoan?: (id:number) => void; // un metodo dentro de una interface
}

const book:Book = {// objeto tipo Book
    id: 1,
    title: 'Only Wolf',
    author: 'Gio'
};

const books:Book[] = []; // array tipo Book

function getBook():Book{ // funcion de tipo Book
    return {id:1, title: 'Only Wolf', author: 'Gio'};
}
const myBook = getBook();

function createBook(book:Book):Book{
    return book;
}
const newBook:Book = {
    id: 1,
    title: 'Only Wolf',
    author: 'Gio',
    coAuthor: 'Arbey'
}
createBook(newBook);
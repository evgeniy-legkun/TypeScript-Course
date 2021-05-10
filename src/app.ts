/* eslint-disable no-underscore-dangle */
/* eslint-disable no-redeclare */
import { BookCategory } from './enums';
import { Book, Person, Author, Librarian, Logger } from './interfaces';
import { ReferenceItem, UniversityLibrarian, Library as Lib, Shelf } from './classes';
import RefBook from './classes/encyclopedia';
import { BookProperties, CreateCustomFunctionType } from './types';
import type { Library } from './classes';

export function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

showHello('greeting', 'TypeScript');

// LESSON_1
export function getAllBooks(): ReadonlyArray<Book> {
    const bookList: readonly Book[] = <const>[
        { id: 1, title: 'Refactoring JavaScript', author: 'Evan Burchard', available: true, category: BookCategory.JavaScript },
        { id: 2, title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false, category: BookCategory.JavaScript },
        { id: 3, title: 'CSS Secrets', author: 'Lea Verou', available: true, category: BookCategory.CSS },
        { id: 4, title: 'Mastering JavaScript Object-Oriented Programming', author: 'Andrea Chiarelli', available: true, category: BookCategory.TypeScript }
    ];

    return bookList;
}

export function logFirstAvailable(bookList: readonly Book[] = getAllBooks()): void {
    const numberOfBooks: number = bookList.length;
    const bookTitle: string = bookList
        .find((book: Book) => book.available)?.title;

    console.log('Number of books: ', numberOfBooks);
    console.log('First available book title: ', bookTitle);
}

export function getBookTitlesByCategory(category: BookCategory = BookCategory.JavaScript): Array<string> {
    const bookList: ReadonlyArray<Book> = getAllBooks();
    return bookList
        .filter((book: Book) => book.category === category)
        .map((book: Book) => book.category);
}

export function logBookTitles(titles: string[]): void {
    titles.forEach(title => console.log(title));
}

export function getBookAuthorByIndex(index: number): [string, string] {
    const bookList: ReadonlyArray<Book> = getAllBooks();
    const { title, author } = bookList[index];
    return [ title, author ];
}

export function calcTotalPages(): bigint {
    const bookList = [
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
    ];

    return bookList.reduce((accumulator, book) => {
        return accumulator + BigInt(book.books) * BigInt(book.avgPagesPerBook);
    }, 0n);
}

const bookList: ReadonlyArray<Book> = getAllBooks();
logFirstAvailable(bookList);
logBookTitles(getBookTitlesByCategory(BookCategory.JavaScript));
// console.log(getBookAuthorByIndex(2));
// console.log(calcTotalPages());

// Lesson 2
let z = <const>{ text: 'hello' };

export function createCustomerID(name: string, id: number): string {
    return `${id}-${name}`;
}

const myID = createCustomerID('Ann', 10);
// console.log('My ID', myID);

let idGenerator: (name: string, id: number) => string = createCustomerID;
// console.log('ID generator', idGenerator('Val', 1));

export function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Customer Name ${name}`);
    if (age) {
        console.log(`Customer Age ${age}`);
    }
    if (city) {
        console.log(`Customer City ${city}`);
    }
}

export function getBookByID(id: number): Book {
    const books: readonly Book[] = getAllBooks();
    return books.find((book: Book) => book.id === id);
}

export function сheckoutBooks(customer: string, ...bookIDs: number[]): string[] {
    console.log(`Customer: ${customer}`);
    const books = getAllBooks();

    return bookIDs
        .map((id) => getBookByID(id))
        .filter((book) => book.available)
        .map((book) => book.title);
}

const myBooks = сheckoutBooks('Anna', ...[1, 2, 3, 4]);
// console.log('Available Books: ', myBooks);

createCustomer('Anna', 30, 'Milan');
getBookTitlesByCategory(undefined);
logFirstAvailable();
getBookByID(3);

// Task 03.03
export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(id: number, available: boolean): string[];
export function getTitles(...args: any[]): string[] {
    const books = getAllBooks();
    let titles: string[] = [];

    if (args.length === 1) {
        const [arg] = args;
        if (typeof arg === 'string') {
            titles = books
                .filter((book) => book.author === arg)
                .map((book) => book.title);
        } else if (typeof arg === 'boolean') {
            titles = books
                .filter((book) => book.available === arg)
                .map((book) => book.title);
        }
    } else if (args.length === 2) {
        const [id, available] = args;

        if (typeof id === 'number' && typeof available === 'boolean') {
            titles = books
                .filter((book) => book.id === id && book.available === available)
                .map((book) => book.title);
        }
    }

    return titles;
};

const checkedOutBooks = getTitles(4, true);
// console.log('Get Titles', checkedOutBooks);

export function assertStringValue (value: any): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error('value should have been a string');
    }
}

export function bookTitleTransform(title: any): string {
    assertStringValue(title);
    return [...title].reverse().join('');
}

// console.log(bookTitleTransform({}));
// console.log(bookTitleTransform('Abs'));
// console.log(bookTitleTransform(123));

// Lesson 3 (4)
export function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`);
}

const myBook: Book = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: BookCategory.CSS,
    pages: 200,
    markDamaged: (reason: string) => {
        console.log(`Damaged: ${reason}`);
    }
};

printBook(myBook);
myBook.markDamaged('missing back cover');

const logDamage: Logger = (reason: string) => {
    console.log(`Damaged: ${reason}`);
};

// logDamage('missing back cover');
const favoriteAuthor: Author = {
    name: 'Anna',
    email: 'anna@example.com',
    numBooksPublished: 1
};

const favoriteLibrarian: Librarian = {
    name: 'Boris',
    email: 'boris@example.com',
    department:'Classical Literature',
    assistCustomer: (name: string) => {
        console.log(`Assist ${name}`);
    }
};

export function getProperty(book: Book, prop: BookProperties): any {
    if (typeof book[prop] === 'function') {
        return (book[prop] as Function).name;
    }

    return book[prop];
}

// console.log(getProperty(getAllBooks()[0], 'title'));
// console.log(getProperty(getAllBooks()[0], 'markDamaged'));

// Lesson 4 (5 - classes)

// const ref: ReferenceItem = new ReferenceItem(100500, 'I love TypeScript', 2021);
// console.log(ref);
// ref.printItem();
// ref.publisher = 'unknown publisher';

// console.log(ref.publisher);
// console.log(ref.getId());

// Lesson 5
// Task 05.02, 05.03
const refBook: RefBook = new RefBook(1, 'I love TypeScript', 2021, 3);
refBook.printItem();
refBook.printCitation();

const favoriteLibrarianInstance: Librarian = new UniversityLibrarian();

// Lesson 6
const flag = true;
if (flag) {
    import('./classes').then(m => {
        const reader = new m.Reared();
        reader.name = 'Anna';
        reader.take(getAllBooks()[2]);
        console.log('Reader : ', reader);
    });
}

// let libObj: Library;

// Task 07.02
const bookShelf: Shelf<Book> = new Shelf<Book>();
// bookShelf.add(); // inventory
// console.log(bookShelf.getFirst());

// Task 07.04
let params: Parameters<CreateCustomFunctionType> = ['Anna', 30];

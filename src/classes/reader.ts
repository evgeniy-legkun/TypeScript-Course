import { Book } from '../interfaces';

export const Reared = class {
    name: string;
    books: Book[] = [];

    take(book: Book): void {
        this.books.push(book);
    }
};

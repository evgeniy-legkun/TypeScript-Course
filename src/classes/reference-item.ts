/* eslint-disable no-underscore-dangle */
abstract class ReferenceItem {
    // title: string;
    year: number;

    // constructor(newTitle: string, newYear: number) {
    //     console.log('Creating a new ReferenceItem...');
    //     this.title = newTitle;
    //     this.year = newYear;
    // }
    #id: number;

    private _publisher: string;

    static department: string = 'Classical Literature';

    get publisher(): string {
        return this._publisher.toUpperCase();
    }

    set publisher(newPublisher: string) {
        this._publisher = newPublisher;
    }

    constructor(id: number, public title: string, year: number) {
        console.log('Creating a new ReferenceItem...');
        this.#id = id;
    }

    printItem(): void {
        console.log(`${this.title} was published in ${this.year}`);
        console.log(ReferenceItem.department);
    }

    getId(): number {
        return this.#id;
    }

    abstract printCitation(): void;
}

export { ReferenceItem };
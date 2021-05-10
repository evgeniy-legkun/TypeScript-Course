import { Librarian } from '../interfaces';
import { writable, logParameter, format } from '../decorators/decorators';

class UniversityLibrarian implements Librarian {
    @format() name: string;
    email: string;
    department: string;

    assistCustomer(@logParameter custName: string): void {
        console.log(`${this.name} is assisting ${custName}`);
    }

    @writable(true)
    assistFaculty(): void {
        console.log('Assisting faculty');
    }

    teachCommunity(): void {

    }
}

export { UniversityLibrarian };
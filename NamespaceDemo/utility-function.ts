namespace Utility {
    export namespace Fees {
        export function calculateLateFree(daysLate: number): number {
            return daysLate * 0.25;
        }
    }

    export function maxBooksAllowed(age: number): number {
        return age < 12 ? 3 : 10;
    }

    function privateFunc () {
        console.log('This is private function');
    }
}
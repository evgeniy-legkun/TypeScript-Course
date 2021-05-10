import { BookCategory } from './enums';
import { Book, Person } from './interfaces';

export type BookProperties = keyof Book;
// export type PersonBook = Person && Book;
export type CreateCustomFunctionType = (name: string, age?: number, city?: string) => void;

type IsArray<T> = T extends Array<any> ? 'array' : 'other';
type ParamType<T> = T extends (name: infer R, age?: number, city?: string) => void ? R : T;
type Param1 = ParamType<CreateCustomFunctionType>;
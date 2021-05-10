import { Book } from './interfaces';
import { BookProperties } from './types';

export function getProperty<TObject, TKey extends keyof TObject>(obj: TObject, prop: TKey): TObject[TKey] | string {
    if (typeof obj[prop] === 'function') {
      return (obj[prop] as Function).name;
    }

    return obj[prop];
}
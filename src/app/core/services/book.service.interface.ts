import { Observable } from 'rxjs';
import { IBook } from '../models/book.model';

export abstract class IBookService {
  abstract getBooks(): Observable<IBook[]>;
  abstract getBook(id: string): Observable<IBook>;
  abstract addBook(book: IBook): Observable<IBook>;
  abstract updateBook(book: IBook): Observable<IBook>;
  abstract deleteBook(id: string): Observable<void>;
}

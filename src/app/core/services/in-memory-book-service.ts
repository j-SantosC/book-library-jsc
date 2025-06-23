import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { IBook } from '../models/book.model';
import { IBookService } from './book.service.interface';

@Injectable()
export class InMemoryBookService implements IBookService {
  private booksSubject = new BehaviorSubject<IBook[]>([
    { id: '1', title: '1984', author: 'George Orwell', year: 1949, genre: 'Dystopia' },
    { id: '2', title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813, genre: 'Romance' },
    { id: '3', title: 'The Hobbit', author: 'J.R.R. Tolkien', year: 1937, genre: 'Fantasy' },
  ]);

  getBooks(): Observable<IBook[]> {
    return this.booksSubject.asObservable();
  }

  getBook(id: string): Observable<IBook> {
    const book = this.booksSubject.getValue().find(b => b.id === id);
    return book ? of(book) : throwError(() => new Error('Book not found'));
  }

  addBook(book: IBook): Observable<IBook> {
    const newBook: IBook = {
      ...book,
      id: this.generateId(),
    };
    const updated = [...this.booksSubject.getValue(), newBook];
    this.booksSubject.next(updated);
    return of(newBook);
  }

  updateBook(book: IBook): Observable<IBook> {
    const books = this.booksSubject.getValue();
    const index = books.findIndex(b => b.id === book.id);
    if (index === -1) return throwError(() => new Error('Book not found'));
    const updated = [...books];
    updated[index] = book;
    this.booksSubject.next(updated);
    return of(book);
  }

  deleteBook(id: string): Observable<void> {
    const books = this.booksSubject.getValue();
    const updated = books.filter(b => b.id !== id);
    this.booksSubject.next(updated);
    return of(void 0);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 8);
  }
}

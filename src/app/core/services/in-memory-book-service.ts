// src/app/core/services/in-memory-book.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { IBook } from '../models/book.model';
import { IBookService } from './book.service.interface';

@Injectable()
export class InMemoryBookService implements IBookService {
  private books: IBook[] = [
    { id: '1', title: '1984', author: 'George Orwell', year: 1949, genre: 'Dystopia' },
    { id: '2', title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813, genre: 'Romance' },
    { id: '3', title: 'The Hobbit', author: 'J.R.R. Tolkien', year: 1937, genre: 'Fantasy' },
  ];

  getBooks(): Observable<IBook[]> {
    return of(this.books);
  }

  getBook(id: string): Observable<IBook> {
    const book = this.books.find(b => b.id === id);
    return book ? of(book) : throwError(() => new Error('Book not found'));
  }

  addBook(book: IBook): Observable<IBook> {
    const newBook: IBook = {
      ...book,
      id: this.generateId(),
    };
    this.books.push(newBook);
    console.log('added');

    return of(newBook);
  }

  updateBook(book: IBook): Observable<IBook> {
    const index = this.books.findIndex(b => b.id === book.id);
    if (index === -1) return throwError(() => new Error('Book not found'));
    this.books[index] = book;
    return of(book);
  }

  deleteBook(id: string): Observable<void> {
    const index = this.books.findIndex(b => b.id === id);
    if (index === -1) return throwError(() => new Error('Book not found'));
    this.books.splice(index, 1);
    return of(void 0);
  }

  private generateId(): string {
    // Devuelve un id aleatorio de 6 caracteres
    return Math.random().toString(36).substring(2, 8);
  }
}

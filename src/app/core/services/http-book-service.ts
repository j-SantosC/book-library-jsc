import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBookService } from './book.service.interface';
import { IBook } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class HttpBookService implements IBookService {
  private baseUrl = 'http://localhost:3000/books'; // json-server

  constructor(private http: HttpClient) {}

  getBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.baseUrl);
  }

  getBook(id: string): Observable<IBook> {
    return this.http.get<IBook>(`${this.baseUrl}/${id}`);
  }

  addBook(book: IBook): Observable<IBook> {
    return this.http.post<IBook>(this.baseUrl, book);
  }

  updateBook(book: IBook): Observable<IBook> {
    return this.http.put<IBook>(`${this.baseUrl}/${book.id}`, book);
  }

  deleteBook(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

// src/app/core/resolvers/book.resolver.ts
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IBookService } from '../services/book.service.interface';
import { IBook } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BookResolver implements Resolve<IBook> {
  constructor(private bookService: IBookService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBook> {
    const id = route.paramMap.get('id')!;
    return this.bookService.getBook(id);
  }
}

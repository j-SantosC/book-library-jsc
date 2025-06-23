import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing-module';
import { BookList } from './pages/book-list/book-list';
import { BookDetail } from './pages/book-detail/book-detail';
import { AddBook } from './pages/add-book/add-book';

@NgModule({
  imports: [CommonModule, LibraryRoutingModule, BookList, BookDetail, AddBook],
})
export class LibraryModule {}

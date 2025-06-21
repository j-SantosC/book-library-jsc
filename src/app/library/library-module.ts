import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing-module';
import { BookList } from '../shared/pages/book-list/book-list';
import { BookDetail } from '../shared/pages/book-detail/book-detail';
import { AddBook } from '../shared/pages/add-book/add-book';


@NgModule({

  imports:[
    CommonModule,
    LibraryRoutingModule,
    BookList,
    BookDetail,
    AddBook
  ]
})
export class LibraryModule { }

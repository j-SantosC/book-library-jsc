import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing-module';
import { BookList } from '../shared/pages/book-list/book-list';
import { BookDetail } from '../shared/pages/book-detail/book-detail';


@NgModule({

  imports:[
    CommonModule,
    LibraryRoutingModule,
    BookList,
    BookDetail
  ]
})
export class LibraryModule { }

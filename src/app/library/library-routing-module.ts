import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookList } from '../shared/pages/book-list/book-list';
import { BookDetail } from '../shared/pages/book-detail/book-detail';
import { AddBook } from '../shared/pages/add-book/add-book';
import { BookResolver } from '../core/resolvers/book.resolver';

const routes: Routes = [
  {
    path: 'detail/:id',
    component: BookDetail,
    resolve: { book: BookResolver }, // 👈 Aquí
  },
  { path: 'add', component: AddBook },
  { path: '', component: BookList },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookList } from '../shared/pages/book-list/book-list';
import { BookDetail } from '../shared/pages/book-detail/book-detail';

const routes: Routes = [
   {
    path: 'detail/:id',
    component: BookDetail
  },
   { path: '', component: BookList }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }

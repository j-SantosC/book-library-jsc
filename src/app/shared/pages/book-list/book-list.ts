import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { IBook } from '../../../core/models/book.model';
import { IBookService } from '../../../core/services/book.service.interface';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.scss'],
})
export class BookList implements OnInit {
  books: IBook[] = [];
  loading = true;
  error = '';

  constructor(private bookService: IBookService, public router: Router) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: data => {
        this.books = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load books';
        this.loading = false;
      },
    });
  }

  toDetail(id: string): void {
    this.router.navigate(['/library/detail', id]);
  }

  deleteBook(id: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.books = this.books.filter(book => book.id !== id);
          alert('Book deleted!');
        },
        error: () => {
          alert('Failed to delete book');
        },
      });
    }
  }
}

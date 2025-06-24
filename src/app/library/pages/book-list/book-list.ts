import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IBook } from '../../../core/models/book.model';
import { IBookService } from '../../../core/services/book.service.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.scss'],
})
export class BookList implements OnInit {
  books$!: Observable<IBook[]>;
  error = '';

  constructor(private bookService: IBookService, public router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.books$ = this.bookService.getBooks();
  }
  toDetail(id: string): void {
    this.router.navigate(['/library/detail', id]);
  }

  deleteBook(id: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          alert('Book deleted!');
          this.books$ = this.bookService.getBooks();
        },
        error: () => {
          alert('Failed to delete book');
        },
      });
    }
  }

  triggerError() {
    this.http.get('http://localhost:3000/non-existent-endpoint').subscribe();
  }
}

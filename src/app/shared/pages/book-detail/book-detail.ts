import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBook } from '../../../core/models/book.model';
import { IBookService } from '../../../core/services/book.service.interface';

@Component({
  standalone: true,
  selector: 'app-book-detail',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-detail.html',
  styleUrls: ['./book-detail.scss'],
})
export class BookDetail implements OnInit {
  book!: IBook;
  form!: FormGroup;
  editing = false;
  loading = true;
  error = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: IBookService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.bookService.getBook(id).subscribe({
      next: (book: IBook) => {
        this.book = book;
        this.form = this.fb.group({
          title: [book.title, Validators.required],
          author: [book.author, Validators.required],
          year: [book.year, Validators.required],
          genre: [book.genre, Validators.required],
        });
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load book';
        this.loading = false;
      },
    });
  }

  toggleEdit(): void {
    this.editing = !this.editing;
  }

  goBack(): void {
    this.router.navigate(['/library']);
  }

  onSubmit(): void {
    if (this.form.valid) {
      const updatedBook: IBook = { ...this.form.value, id: this.book.id };
      this.bookService.updateBook(updatedBook).subscribe(() => {
        this.book = updatedBook;
        this.editing = false;
        alert('Book updated!');
      });
    }
  }
}

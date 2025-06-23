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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: IBookService
  ) {}

  ngOnInit(): void {
    this.book = this.route.snapshot.data['book'];

    this.form = this.fb.group({
      title: [this.book.title, Validators.required],
      author: [this.book.author, Validators.required],
      year: [this.book.year, Validators.required],
      genre: [this.book.genre, Validators.required],
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

      this.bookService.updateBook(updatedBook).subscribe({
        next: () => {
          alert('Book updated!');
          this.book = updatedBook;
          this.editing = false;
        },
        error: () => {
          alert('Error updating book');
        },
      });
    }
  }
}

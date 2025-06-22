import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IBookService } from '../../../core/services/book.service.interface';
import { IBook } from '../../../core/models/book.model';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-book.html',
  styleUrls: ['./add-book.scss'],
})
export class AddBook {
  form: FormGroup;
  private bookService = inject(IBookService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(0)]],
      genre: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const newBook: IBook = this.form.value;
      this.bookService.addBook(newBook).subscribe(() => {
        alert('Book added!');
        this.router.navigate(['/library']);
      });
    }
  }

  back() {
    this.router.navigate(['/library']);
  }
}

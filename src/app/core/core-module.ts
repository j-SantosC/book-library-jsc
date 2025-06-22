import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBookService } from './services/book.service.interface';
import { HttpBookService } from './services/http-book-service';
import { InMemoryBookService } from './services/in-memory-book-service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [{ provide: IBookService, useClass: HttpBookService }],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it only once.');
    }
  }
}

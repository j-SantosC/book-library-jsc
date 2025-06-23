import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBookService } from './services/book.service.interface';
import { HttpBookService } from './services/http-book-service';
import { InMemoryBookService } from './services/in-memory-book-service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  // Use HTTP (with json-server)
  providers: [{ provide: IBookService, useClass: HttpBookService }],
  // Use in-memory (local data)
  // providers: [{ provide: IBookService, useClass: InMemoryBookService }],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it only once.');
    }
  }
}

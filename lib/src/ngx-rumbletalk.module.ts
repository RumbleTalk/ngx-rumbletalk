import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NgxRumbletalkService } from './ngx-rumbletalk.service';
import { NgxRumbletalkComponent } from './ngx-rumbletalk.component';

@NgModule({
  imports: [FormsModule, CommonModule, HttpClientModule],
  exports: [NgxRumbletalkComponent],
  declarations: [NgxRumbletalkComponent],
  providers: [NgxRumbletalkService],
})
export class NgxRumbletalkModule {}

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { NgxRumbletalkService } from './ngx-rumbletalk.service';
import { NgxRumbletalkComponent } from './ngx-rumbletalk.component';

@NgModule({
  providers: [NgxRumbletalkService],
  declarations: [NgxRumbletalkComponent],
  imports: [HttpClientModule, BrowserModule, FormsModule],
  exports: [NgxRumbletalkComponent]
})
export class NgxRumbletalkModule {}

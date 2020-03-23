import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxRumbletalkComponent } from './ngx-rumbletalk.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [NgxRumbletalkComponent],
  imports: [HttpClientModule, BrowserModule, FormsModule],
  exports: [NgxRumbletalkComponent]
})
export class NgxRumbletalkModule {}

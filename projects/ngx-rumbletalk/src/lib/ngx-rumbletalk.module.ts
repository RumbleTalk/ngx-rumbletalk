import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxRumbletalkComponent } from './ngx-rumbletalk.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [NgxRumbletalkComponent],
  imports: [HttpClientModule, BrowserModule],
  exports: [NgxRumbletalkComponent]
})
export class NgxRumbletalkModule {}

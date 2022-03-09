import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxRumbletalkModule } from 'ngx-rumbletalk';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [FormsModule, BrowserModule, NgxRumbletalkModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

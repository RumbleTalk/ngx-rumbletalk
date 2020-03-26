import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxRumbletalkModule } from 'ngx-rumbletalk';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, NgxRumbletalkModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

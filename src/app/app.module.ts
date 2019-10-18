import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxRumbletalkModule } from 'ngx-rumbletalk';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxRumbletalkModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxRumbletalkModule } from 'ngx-rumbletalk';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxRumbletalkModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

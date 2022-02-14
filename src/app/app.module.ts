import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgxRumbletalkModule } from "../../lib/src/ngx-rumbletalk.module";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, NgxRumbletalkModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NgxRumbletalkService } from './ngx-rumbletalk.service';
import { NgxRumbletalkComponent } from './ngx-rumbletalk.component';

@NgModule({
  providers: [NgxRumbletalkService],
  declarations: [NgxRumbletalkComponent],
  imports: [HttpClientModule, CommonModule, FormsModule],
  exports: [NgxRumbletalkComponent]
})
export class NgxRumbletalkModule {}

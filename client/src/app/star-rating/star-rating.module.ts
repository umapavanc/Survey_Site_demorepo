import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './star-rating.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';




@NgModule({
  declarations: [StarRatingComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule
  ],
  exports: [
    StarRatingComponent
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StarRatingModule { }

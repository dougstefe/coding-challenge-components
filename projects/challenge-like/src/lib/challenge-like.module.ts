import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChallengeLikeComponent } from './challenge-like.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [ChallengeLikeComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [ChallengeLikeComponent]
})
export class ChallengeLikeModule { }

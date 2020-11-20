import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChallengeLikeService } from './challenge-like.service';
import { Like, Post, User } from './models';

@Component({
  selector: 'challenge-like',
  template: `
  <ng-container *ngIf="like$ | async as like; else loadingLike">
    <div>
      <button (click)="likeClick()" [ngClass]="{'active': like.liked}">Like</button>
      <button (click)="dislikeClick()" [ngClass]="{'active': !like.liked}">Dislike</button>
    </div>
  </ng-container>
  <ng-template #loadingPost>
    <div class="loading">
        <div></div>
    </div>
  </ng-template>
  `,
  styles: [
    'button.active { color: red }'
  ]
})
export class ChallengeLikeComponent implements OnInit {
  
  @Input() endpoint: string;
  @Input() trackCode: string;
  @Input() post: Post;
  @Input() user: User;

  public like$: Observable<Like>;
  private like : Like;

  constructor(private http: HttpClient, private challengeLikeService: ChallengeLikeService) {}

  ngOnInit(): void {
    this.like$ = this.challengeLikeService.get(this.post, this.user, this.endpoint, this.trackCode);
    this.like$.subscribe(response => {this.like = response});
  }

  likeClick(): void {
    if(this.like){
      if(this.like.liked){
        this.challengeLikeService.delete(this.post, this.user, this.endpoint, this.trackCode);
      }
      else{
        this.challengeLikeService.put(this.post, this.user, true, this.endpoint, this.trackCode);
      }
    }
    else{
      this.challengeLikeService.post(this.post, this.user, true, this.endpoint, this.trackCode);
    }
  }

  dislikeClick(): void {
    if(this.like){
      if(this.like.liked){
        this.challengeLikeService.delete(this.post, this.user, this.endpoint, this.trackCode);
      }
      else{
        this.challengeLikeService.put(this.post, this.user, false, this.endpoint, this.trackCode);
      }
    }
    else{
      this.challengeLikeService.post(this.post, this.user, false, this.endpoint, this.trackCode);
    }
  }

}

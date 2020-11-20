import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth, Like, Post, User } from './models';

@Injectable({
  providedIn: 'root'
})
export class ChallengeLikeService {

  constructor(private http: HttpClient) { }

  private auth(endpoint: string, trackCode: string): Auth {
    const authLike = localStorage.getItem("auth_like");
    if(authLike){
      return JSON.parse(authLike);
    }
    this.http.post(`${endpoint}/api/v1/auth`, {
      'trackCode': trackCode
    }).subscribe(
      auth => {
        localStorage.setItem("auth_like", JSON.stringify(auth));
        return auth;
      }
    );
  }

  get(post: Post, user: User, endpoint: string, trackCode: string): Observable<Like>{
    const token = this.auth(endpoint, trackCode);
    return this.http.get<Like>(`${endpoint}/api/v1/like/user/${user.id}/post/${post.id}`, {'headers': {'Authorization': `Bearer ${token.accessToken}`}});
  }

  post(post: Post, user: User, liked: boolean, endpoint: string, trackCode: string): Observable<Like>{
    const token = this.auth(endpoint, trackCode);
    return this.http.post<Like>(
      `${endpoint}/api/v1/like`, {
        'id': post.id,
        'user': {
            'id': user.id,
            'name': user.name
        },
        'title': post.title,
        'liked': liked
      }, {
        'headers': {
          'Authorization': `Bearer ${token.accessToken}`
        }
      }
    );
  }

  put(post: Post, user: User, liked: boolean, endpoint: string, trackCode: string): Observable<any>{
    const token = this.auth(endpoint, trackCode);
    return this.http.put<Like>(
      `${endpoint}/api/v1/like/user/${user.id}/post/${post.id}/liked`, {
        'liked': liked
      }, {
        'headers': {
          'Authorization': `Bearer ${token.accessToken}`
        }
      }
    );
  }

  delete(post: Post, user: User, endpoint: string, trackCode: string): Observable<any>{
    const token = this.auth(endpoint, trackCode);
    return this.http.delete<Like>(
      `${endpoint}/api/v1/like/user/${user.id}/post/${post.id}`, {
        'headers': {
          'Authorization': `Bearer ${token.accessToken}`
        }
      }
    );
  }

}

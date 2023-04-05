import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Review } from './model';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  searchReviews(query: string): Observable<Review[]> {
    const params = new HttpParams().set('query', query);

    return this.http
      .get(`${this.apiUrl}/search`, { params })
      .pipe(map((response: any) => response.results.map((result: any) => new Review(result))));
  }

  postComment(payload: {
    movieId: string;
    movieName: string;
    name: string;
    rating: number;
    comment: string;
  }): Observable<void> {
    // Replace the URL with the correct API endpoint for your backend
    const apiUrl = `${this.apiUrl}/api/comment`;

    const formData = new FormData();
    formData.append('movieId', payload.movieId);
    formData.append('movieName', payload.movieName);
    formData.append('name', payload.name);
    formData.append('rating', payload.rating.toString());
    formData.append('comment', payload.comment);

    return this.http.post<void>(apiUrl, formData);
  }
}
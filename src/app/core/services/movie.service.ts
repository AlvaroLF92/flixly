import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private headers = new HttpHeaders({
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWIwZDllMDRhMmNhNWFkN2I1ZjM4NzJiODAzYzc3NiIsIm5iZiI6MTc1MzIzNjE0NS45MjYsInN1YiI6IjY4ODA0MmIxMWRiMjMyMmRiMDM4ZTM2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6rn0KtIxN-kxYun79a0-d-wF96hPWiI-hbFf-p85ml0`,
  });

  constructor(private http: HttpClient) {}

  getPopularMovies(): Observable<{ results: Movie[] }> {
    return this.http.get<{ results: Movie[] }>(
      `${this.apiUrl}/movie/popular?language=es-ES`,
      { headers: this.headers }
    );
  }

  getTopRatedMovies(): Observable<{ results: Movie[] }> {
    return this.http.get<{ results: Movie[] }>(
      `${this.apiUrl}/movie/top_rated?language=es-ES`,
      { headers: this.headers }
    );
  }

  getUpcomingMovies(): Observable<{ results: Movie[] }> {
    return this.http.get<{ results: Movie[] }>(
      `${this.apiUrl}/movie/upcoming?language=es-ES`,
      { headers: this.headers }
    );
  }
}

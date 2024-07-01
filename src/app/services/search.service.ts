import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Poetry } from '../models/poetry.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public baseUrl = 'https://poetrydb.org';

  constructor(private http: HttpClient) {}

  showRandomSearch(): Observable<Poetry[]> {
    return this.http.get<Poetry[]>(`${this.baseUrl}/random/10`);
  }

  searchByCriteria(
    criteriaType: string | null,
    criteria: string
  ): Observable<Poetry[]> {
    return this.http.get<Poetry[]>(
      `${this.baseUrl}/${criteriaType}/${criteria}`
    );
  }
}

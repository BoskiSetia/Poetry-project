// import { TestBed } from '@angular/core/testing';

// import { SearchService } from './search.service';

// describe('SearchService', () => {
//   let service: SearchService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(SearchService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { SearchService } from './search.service';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { SearchbarComponent } from '../components/searchbar/searchbar.component';
import { HomeComponent } from '../components/home/home.component';
// import { AppComponent } from './app.component';

describe('SearchService', () => {
  let service: SearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchbarComponent, HomeComponent],
      providers: [
        SearchService,
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(SearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch poems by author', () => {
    const dummyPoems = [
      { title: 'Poem 1', author: 'Author 1', lines: ['Line 1'] },
    ];
    service.searchByAuthor('Author 1').subscribe((poems) => {
      expect(poems.length).toBe(1);
      expect(poems).toEqual(dummyPoems);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/author/Author 1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPoems);
  });

  it('should fetch poems by title', () => {
    const dummyPoems = [
      { title: 'Poem 1', author: 'Author 1', lines: ['Line 1'] },
    ];
    service.searchByTitle('Title 1').subscribe((poems) => {
      expect(poems.length).toBe(1);
      expect(poems).toEqual(dummyPoems);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/title/Title 1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPoems);
  });

  // Similar tests for searchPoemsByLines, searchPoemsByLineCount, and searchPoemsByPoemCount
});

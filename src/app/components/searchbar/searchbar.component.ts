import { Component, OnInit, ViewChild, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SearchService } from '../../services/search.service';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { A11yModule } from '@angular/cdk/a11y';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTooltipModule,
    A11yModule,
    ScrollingModule,
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css',
})
export class SearchbarComponent implements OnInit {
  termsList = ['Author', 'Title', 'Lines', 'Linecount', 'Poemcount'];

  selectedTerms: any;

  searchTerm = new FormControl('');
  searchType = new FormControl('');
  searchResults: any[] = [];
  errorMessage: string = '';

  searchRandomResults: any[] = [];
  panelOpenState: any = signal(false);

  constructor(
    private searchService: SearchService,
    private snackBar: MatSnackBar
  ) {}

  myGroup = new FormGroup({
    Author: new FormControl(),
    Title: new FormControl(),
    Lines: new FormControl(),
    Linecount: new FormControl(),
    Poemcount: new FormControl(),
  });

  ngOnInit() {
    // API service call to show random poem on page load
    this.searchService.showRandomSearch().subscribe({
      next: (results) => {
        this.searchResults = results;
        console.log(this.searchRandomResults);
      },
      error: (error) => {
        console.error('Error fetching search results', error);
      },
    });
  }

  // function call API and filtered data on criteria term and type such as Author, title, lines, linecount and poemcount
  onSearch() {
    let searchTerm = '';
    let searchType = '';

    for (let term in this.selectedTerms) {
      searchType += this.selectedTerms[term] + ',';
      let searchValue = this.myGroup.get(this.selectedTerms[term])?.value;
      searchTerm += searchValue + ';';
    }
    searchType = searchType.toLowerCase();
    if (searchTerm) {
      this.searchService.searchByCriteria(searchType, searchTerm).subscribe({
        next: (results: any) => {
          if (results instanceof Array) {
            this.searchResults = results;
            this.searchRandomResults = [];
          } else {
            this.searchRandomResults = [];
            // alert('results not found');
            this.openSnackBar('results not found', 'OK!');
          }
        },
        error: (error) => {
          this.openSnackBar('Error fetching search results: ', error);
        },
      });
    } else {
      this.openSnackBar('Please select search type', 'OK!');
      // alert('Please enter search text ');
    }

    // this.searchTerm.reset('');
    // this.searchType.reset('');
  }

  openSnackBar(message: any, action: any) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['red-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}

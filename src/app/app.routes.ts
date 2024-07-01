import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
export const routes: Routes = [
  //   { path: "404", component: PageNotFoundComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];

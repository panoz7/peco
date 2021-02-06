import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { LocationsComponent } from './locations/locations.component';


const routes: Routes = [
  { path: 'locations', component: LocationsComponent },
  { path: 'locations/:id', component: LocationDetailsComponent },
  { path: '', redirectTo: '/locations', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

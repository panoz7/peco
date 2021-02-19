import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { LocationsComponent } from './locations/locations.component';
import { NestDetailsComponent } from './nest-details/nest-details.component';


const routes: Routes = [
  { path: 'locations', component: LocationsComponent },
  { path: 'locations/:id', component: LocationDetailsComponent },
  { path: 'nests/:id', component: NestDetailsComponent },
  { path: '', redirectTo: '/locations', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

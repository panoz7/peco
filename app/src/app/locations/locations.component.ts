import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { Location } from '../interfaces'

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  locations: Location[];
  selectedLocation: Location; 

  constructor(private locationService: LocationService ) { }

  ngOnInit(): void {
    this.getLocations();
  }

  getLocations(): void {
    this.locationService.getLocations()
        .subscribe(locations => this.locations = locations);
  }

  deleteLocation(location): void {

    const confirmDelete = window.confirm(`Are you sure you want to delete ${location.name}?`)

    if (confirmDelete) {
      this.locationService.deleteLocation(location.id)
      .subscribe(result => {
        console.log(result);
        this.locations = this.locations.filter(l => l !== location)
      });
    }

  }


}

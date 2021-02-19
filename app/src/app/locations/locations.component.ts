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
  editLocation: Location;
  addLocation: Boolean;

  constructor(private locationService: LocationService ) { }

  ngOnInit(): void {
    this.getLocations();
  }

  // getLocations(): void {
  //   // this.locationService.getLocations()
  //   //     .subscribe(
  //   //       res => this.locations = res,
  //   //       error => console.log('error test', error)
  //   //     );
  //   this.locationService.getLocations()
  //   .then(
  //     res => this.locations = res
  //   ).catch(err => {
  //     console.log('error', err);
  //   });  
  // }

  async getLocations(): Promise<void> {
    try {
      this.locations = await this.locationService.getLocations();
    } catch(e) {
      console.log('error', e);
    }
  }


  async deleteLocation(location): Promise<void> {

    const confirmDelete = window.confirm(`Are you sure you want to delete ${location.name}?`)

    if (confirmDelete) {
      try {
        await this.locationService.deleteLocation(location.id);
        this.locations = this.locations.filter(l => l !== location)
      } catch(e) {
        console.log(e);
      }
    }
  }

  onEditLocation(location: Location) {
    this.editLocation = location; 
    console.log('editing')
  }

  onEditCancled() {
    this.editLocation = undefined;
  }

  onEditSubmit(success: boolean) {
    this.getLocations();
    this.editLocation = undefined;
    this.addLocation = false;
  }

  showAddLocation() {
    this.addLocation = true;
  }
  
  onAddCancled() {
    this.addLocation = false;
  }
  


}

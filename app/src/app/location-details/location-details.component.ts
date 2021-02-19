import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LocationDetails } from '../interfaces';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit, OnChanges {

  location: LocationDetails;
  isEditing: Boolean;

  constructor(
    private locationService: LocationService,
    private ngLocation: Location,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getLocation();
  }

  ngOnChanges() {
  }

  getLocation() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.locationService.getLocation(id)
      .subscribe(location => this.location = location);
  }

  async deleteLocation(): Promise<void> {

    const confirmDelete = window.confirm(`Are you sure you want to delete ${this.location.name}?`)

    if (confirmDelete) {
      try {
        await this.locationService.deleteLocation(this.location.id);
        this.router.navigate(['locations']);
      } catch(e) {
        console.log(e);
      }
    }
  }

  editLocation() {
    this.isEditing = true;
  }

  closeEdit() {
    this.isEditing = undefined;
  }

  goBack() {
    this.ngLocation.back();
  }


}

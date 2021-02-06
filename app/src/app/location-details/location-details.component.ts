import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LocationService } from '../location.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit, OnChanges {

  location: {};

  constructor(
    private locationService: LocationService,
    private ngLocation: Location,
    private route: ActivatedRoute,
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

  goBack() {
    this.ngLocation.back();
  }


}

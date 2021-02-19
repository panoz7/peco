import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location as NgLocation } from '@angular/common';
import { Location, Nest } from '../interfaces';
import { LocationService } from '../location.service';
import { NestService } from '../nest.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit, OnChanges {

  location: Location;
  isEditing: Boolean;
  isAddingNest: Boolean;

  constructor(
    private locationService: LocationService,
    private nestService: NestService,
    private ngLocation: NgLocation,
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

  onEditSubmit() {
    this.isAddingNest = false;
    this.getLocation();
  }

  async deleteNest(nest: Nest) {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${nest.name}?`)

    if (confirmDelete) {
      try {
        await this.nestService.deleteNest(nest.id);
        this.location.nests = this.location.nests.filter(n => n !== nest)
      } catch(e) {
        console.log(e);
      }
    }
  }

  onAddNestCancel() {
    this.isAddingNest = false;
  }

  // showAddNest() {
  //   this.isAddingLocation = true;
  // }


}

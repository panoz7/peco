import { Component, OnInit, OnChanges, EventEmitter, Input, Output } from '@angular/core';
import {NgForm} from '@angular/forms';

import { Location } from '../interfaces';

import { LocationService } from '../location.service';

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.scss']
})
export class LocationEditComponent implements OnInit, OnChanges {

  @Output() submitted = new EventEmitter<boolean>();
  @Output() cancled = new EventEmitter<boolean>();

  @Input() location: Location;
  
  edit: boolean;
  model: Location = {name: undefined, id: undefined};

  constructor(private locationService: LocationService ) { }

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.location) {
      this.model = this.location;
      this.edit = true; 
    }
  }

  onCancel() {
    this.cancled.emit(true);
  }

  async onSubmit(form: NgForm) {

    if (this.edit) {
      await this.locationService.updateLocation(this.model)
      this.submitted.emit(true);
    } else {
      await this.locationService.insertLocation(this.model)
      this.submitted.emit(true);
      form.reset();
    }

    this.submitted.emit(true);
  }
}

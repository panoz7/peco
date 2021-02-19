import { Component, OnInit, OnChanges, EventEmitter, Input, Output } from '@angular/core';
import {NgForm} from '@angular/forms';

import { Nest, Location } from '../interfaces';
import { NestService } from '../nest.service';


@Component({
  selector: 'app-nest-edit',
  templateUrl: './nest-edit.component.html',
  styleUrls: ['./nest-edit.component.scss']
})
export class NestEditComponent implements OnInit, OnChanges {

  @Output() submitted = new EventEmitter<boolean>();
  @Output() cancled = new EventEmitter<boolean>();

  @Input() nest: Nest;
  @Input() location: Location;


  edit: boolean;
  model: Nest = {name: undefined, id: undefined};

  constructor(private nestService: NestService ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.nest) {
      this.model = this.nest;
      this.edit = true; 
    }
    console.log('edit', this.edit)
  }

  onCancel() {
    this.cancled.emit(true);
  }

  async onSubmit(form: NgForm) {

    if (this.edit) {
      await this.nestService.updateNest(this.model)
      this.submitted.emit(true);
    } else {
      await this.nestService.insertNest(this.location.id, this.model)
      this.submitted.emit(true);
      form.reset();
    }

    this.submitted.emit(true);
  }

}

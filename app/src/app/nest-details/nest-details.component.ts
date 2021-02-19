import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Nest } from '../interfaces';
import { NestService } from '../nest.service';


@Component({
  selector: 'app-nest-details',
  templateUrl: './nest-details.component.html',
  styleUrls: ['./nest-details.component.scss']
})
export class NestDetailsComponent implements OnInit {

  nest: Nest;
  isEditing: Boolean;

  constructor(
    private nestService: NestService,
    private ngLocation: Location,
    private route: ActivatedRoute,
    private router: Router
    ) { }


  ngOnInit(): void {
    this.getNest();
  }

  getNest() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.nestService.getNest(id)
      .subscribe(nest => {this.nest = nest
        console.log(nest)});
  }

  goBack() {
    this.ngLocation.back();
  }

  endEdit() {
    this.isEditing = false;
  }

  async deleteNest(): Promise<void> {

    const confirmDelete = window.confirm(`Are you sure you want to delete ${this.nest.name}?`)

    if (confirmDelete) {
      try {
        await this.nestService.deleteNest(this.nest.id);
        this.router.navigate([`locations/${this.nest.locationId}`]);
      } catch(e) {
        console.log(e);
      }
    }
  }

}

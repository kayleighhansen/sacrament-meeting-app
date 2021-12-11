import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Bishopric } from '../bishopric.model';
import { BishopricService } from '../bishopric.service';

@Component({
  selector: 'bishopric-detail',
  templateUrl: './bishopric-detail.component.html',
  styleUrls: ['./bishopric-detail.component.css']
})
export class BishopricDetailComponent implements OnInit {


  bishopric: Bishopric;
  id: number;

  constructor(private bishopricService: BishopricService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.bishopric = this.bishopricService.getBishopric(this.id)
        }
      )
  }

  onAddToBishopricList() {
    this.bishopricService.addBishopric(this.bishopric)
  }

  onEditBishopric() {
    this.router.navigate(['edit'], { relativeTo: this.route })
  }

  onReleaseBishopric() {
    this.bishopricService.releaseBishopric(this.id);
    this.router.navigate(['/bishopric']);
  }

}

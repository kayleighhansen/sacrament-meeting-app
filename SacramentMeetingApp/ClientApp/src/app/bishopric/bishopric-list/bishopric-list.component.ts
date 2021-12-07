import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Bishopric } from '../bishopric.model';
import { BishopricService } from '../bishopric.service';

@Component({
  selector: 'bishopric-list',
  templateUrl: './bishopric-list.component.html',
  styleUrls: ['./bishopric-list.component.css']
})
export class BishopricListComponent implements OnInit {

  bishoprics: Bishopric[];

  constructor(private bishopricService: BishopricService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.bishoprics = this.bishopricService.getBishoprics();
  }

  onNewBishopric() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

}

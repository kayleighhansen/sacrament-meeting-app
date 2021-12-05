import { Component, OnInit } from '@angular/core';

import { Bishopric } from '../bishopric.model';
import { BishopricService } from '../bishopric.service';

@Component({
  selector: 'bishopric-list',
  templateUrl: './bishopric-list.component.html',
  styleUrls: ['./bishopric-list.component.css']
})
export class BishopricListComponent implements OnInit {

  bishoprics: Bishopric[];

  constructor(private bishopricService: BishopricService) { }

  ngOnInit() {
    this.bishoprics = this.bishopricService.getBishoprics();
  }

  onNewBishopric() {

  }

}

import { Component, Input, OnInit } from '@angular/core';

import { Bishopric } from '../../bishopric.model';

@Component({
  selector: 'bishopric-item',
  templateUrl: './bishopric-item.component.html',
  styleUrls: ['./bishopric-item.component.css']
})
export class BishopricItemComponent implements OnInit {

  @Input() bishopric: Bishopric;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }



}

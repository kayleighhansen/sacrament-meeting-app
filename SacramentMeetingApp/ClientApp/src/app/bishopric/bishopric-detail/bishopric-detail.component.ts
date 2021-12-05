import { Component, OnInit } from '@angular/core';
import { Bishopric } from '../bishopric.model';

@Component({
  selector: 'app-bishopric-detail',
  templateUrl: './bishopric-detail.component.html',
  styleUrls: ['./bishopric-detail.component.css']
})
export class BishopricDetailComponent implements OnInit {


  bishopric = new Bishopric(
    1,
    'Joseph Smith',
    'Bishop',
    true
  )

  constructor() { }

  ngOnInit() {
  }

  onAddToBishopricList() {

  }

  onEditBishopric() {

  }
}

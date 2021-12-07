import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-bishopric-edit',
  templateUrl: './bishopric-edit.component.html',
  styleUrls: ['./bishopric-edit.component.css']
})
export class BishopricEditComponent implements OnInit {

  id: number;
  editMode = false;

  constructor(private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
        }
      )
  }

}

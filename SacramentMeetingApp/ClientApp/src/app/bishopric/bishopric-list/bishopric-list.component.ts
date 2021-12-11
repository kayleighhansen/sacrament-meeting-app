import { Route } from '@angular/compiler/src/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Bishopric } from '../bishopric.model';
import { BishopricService } from '../bishopric.service';

@Component({
  selector: 'bishopric-list',
  templateUrl: './bishopric-list.component.html',
  styleUrls: ['./bishopric-list.component.css']
})
export class BishopricListComponent implements OnInit, OnDestroy {


  bishoprics: Bishopric[];
  private bishopricChangedSub: Subscription;

  //Can be Deleted Soon
  private defaultBishopric: Bishopric = {
    id: 3,
    name: 'John Taylor',
    calling: 'Bishop',
    status: true
  }

  constructor(private bishopricService: BishopricService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.bishoprics = this.bishopricService.getBishoprics();

    this.bishopricChangedSub = this.bishopricService.bishopricChangedEvent.subscribe(
      (bishoprics: Bishopric[]) => { this.bishoprics = bishoprics }
    )
  }

  onNewBishopric() {
    // this.bishopricService.addBishopric(this.defaultBishopric);
    this.router.navigate(['new'], { relativeTo: this.route })
  }


  ngOnDestroy() {
    this.bishopricChangedSub.unsubscribe();
  }

}

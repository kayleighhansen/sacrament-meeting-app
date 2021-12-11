import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Bishopric } from './bishopric.model';
import { MOCKBISHOPRICS } from './MOCKBISHOPRICS';

@Injectable({
  providedIn: 'root'
})
export class BishopricService {

  bishopricSelectedEvent = new EventEmitter<Bishopric>(); //Need to figure out who subscribes to this
  bishopricChangedEvent = new Subject<Bishopric[]>();

  private bishoprics: Bishopric[];
  private maxBishopricId: number;
  private currentBishopricId: number;
  private bishopricsClone: Bishopric[];
  private pos: number;

  constructor() {
    this.bishoprics = MOCKBISHOPRICS;
    this.maxBishopricId = this.getMaxBishopricId();
  }

  getBishoprics() {
    return this.bishoprics.slice();
  }

  getBishopric(index: number) {
    return this.bishoprics[index]
  }

  getMaxBishopricId() {
    this.maxBishopricId = 0;

    for (let i = 0; i < this.bishoprics.length; i++) {
      const bishopric = this.bishoprics[i];

      this.currentBishopricId = bishopric.id;

      if (this.maxBishopricId < this.currentBishopricId) {
        this.maxBishopricId = this.currentBishopricId;
      }
    }

    return this.maxBishopricId;
  }

  addBishopric(newBishopric: Bishopric) {
    if (!newBishopric) {
      return;
    }

    this.maxBishopricId++;
    newBishopric.id = this.maxBishopricId;
    this.bishoprics.push(newBishopric);

    console.log('You have added a bishopric member');

    this.bishopricsClone = this.bishoprics.slice();
    this.bishopricChangedEvent.next(this.bishopricsClone);
  }

  updateBishopric(index: number, newBishopric: Bishopric) {


    //New Code

    // Previous Code took these as parameters (originalBishopric: Bishopric, newBishopric: Bishopric)
    // if (!originalBishopric || !newBishopric) {
    //   return;
    // }

    // this.pos = this.bishoprics.indexOf(originalBishopric);
    // if (this.pos < 0) {
    //   return;
    // }

    // newBishopric.id = originalBishopric.id;
    // this.bishoprics[this.pos] = newBishopric;
    // this.bishopricsClone = this.bishoprics.slice();
    // this.bishopricChangedEvent.next(this.bishopricsClone);

  }

  releaseBishopric(index: number) {
    this.bishoprics[index].status = false;
  }



}

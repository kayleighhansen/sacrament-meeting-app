import { HttpClient } from '@angular/common/http';
import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Bishopric } from './bishopric.model';
import { MOCKBISHOPRICS } from './MOCKBISHOPRICS';

@Injectable({
  providedIn: 'root'
})
export class BishopricService {

  bishopricSelectedEvent = new EventEmitter<Bishopric>(); //Need to figure out who subscribes to this
  bishopricChangedEvent = new Subject<Bishopric[]>();

  fetchBishopricEvent = new Subject<Bishopric[]>();
  bishopricListChanged = new Subject<Bishopric[]>();

  private currentBishopric: Bishopric[] = [];
  private bishoprics: Bishopric[];
  private maxBishopricId: number;
  private currentBishopricId: number;
  private bishopricsClone: Bishopric[];
  private pos: number;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseURL: string) {
    this.bishoprics = MOCKBISHOPRICS;
    this.maxBishopricId = this.getMaxBishopricId();

  }

  getBishoprics() {
    return this.bishoprics.slice();
  }

  makeBishopricsCurrent() {

    //Set currentBishopric to empty
    this.currentBishopric = [];

    //Fill currentBishopric with all members from bishoprics that are current
    this.bishoprics.forEach(
      (bishopric) => {
        if (bishopric.status) {
          this.currentBishopric.push(bishopric);
        }
      }
    )

  }

  getCurrentBishopric() {
    return this.currentBishopric;
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
    newBishopric.status = true;
    this.bishoprics.push(newBishopric);

    this.makeBishopricsCurrent();
    // this.orderBishopric();

    this.bishopricChangedEvent.next(this.currentBishopric.slice());
  }

  updateBishopric(index: number, newBishopricInfo: Bishopric) {

    // Get highest ID in bishopric, add 1
    this.maxBishopricId = this.getMaxBishopricId();

    // Set bishopric.status at current id to false
    this.bishoprics[index].status = false;

    // assign new info to newBishopric
    let newBishopric = {
      id: this.maxBishopricId,
      name: newBishopricInfo.name,
      calling: newBishopricInfo.calling,
      status: true
    }

    // push to bishoprics
    this.bishoprics.push(newBishopric);

    console.log(this.bishoprics);

    //Get active bishopric members
    this.bishoprics.forEach(
      (bishopric) => {
        if (bishopric.status) {
          // console.log(bishopric);
          // this.bishopricCurrent.push(bishopric); 
        }
      }
    )

    // console.log(this.bishopricCurrent);

    //Order them by calling

    // emit bishoprics changed
    this.bishopricChangedEvent.next(this.bishoprics.slice());


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
    console.log(this.bishoprics[index].name);
    this.bishoprics[index].status = false;
    this.makeBishopricsCurrent();
    this.bishopricChangedEvent.next(this.currentBishopric.slice());

    // console.log('All bishopric members ');
    // console.log(this.bishoprics.forEach((bishopric) => console.log(bishopric)));
    // console.log('All current bishopric members ');
    // console.log(this.currentBishopric.forEach((bishopric) => console.log(bishopric)));
  }

  orderBishopric() {

    // Go through the currentBishopric array
    let tempBishopric = [];

    // Add members back in based on calling
    this.currentBishopric.forEach(
      (bishopric) => {
        if (bishopric.calling === 'Bishop') {
          tempBishopric[0] = bishopric;
        } else if (bishopric.calling === '1st Counselor') {
          tempBishopric[1] = bishopric;
        } else if (bishopric.calling === '2nd Counselor') {
          tempBishopric[2] = bishopric;
        }
      }
    )

    //Reassign current bishopric
    this.currentBishopric = tempBishopric;
  }



  fetchBishopric() {
    this.http.get<Bishopric>(this.baseURL + "api/Bishopric")
      .pipe(
        map(responseData => {
          const postsArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key })
            }
          }
          return postsArray;
        })
      )
      .subscribe(bishopric => {
        this.bishoprics = bishopric;
        this.fetchBishopricEvent.next(this.bishoprics);

        this.bishoprics.sort((a, b) =>
          a.status > b.status ? 1 : b.status > a.status ? -1 : 0);
        this.bishopricListChanged.next(this.bishoprics.slice());
      });
  }


}

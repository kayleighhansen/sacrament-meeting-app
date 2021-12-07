import { Injectable } from '@angular/core';

import { Bishopric } from './bishopric.model';

@Injectable({
  providedIn: 'root'
})
export class BishopricService {

  private bishoprics = [
    new Bishopric(
      1,
      'Joseph Smith',
      'Bishop',
      true
    ),
    new Bishopric(
      2,
      'Brigham Young',
      '1st Counselor',
      true
    ),
    new Bishopric(
      3,
      'John Taylor',
      '2nd Counselor',
      true
    )

  ]

  constructor() { }

  getBishoprics() {
    return this.bishoprics.slice();
  }

  getBishopric(index: number) {
    return this.bishoprics[index]
  }

  addBishopric(bishopric: Bishopric) {
    this.bishoprics.push(bishopric);
    //this.ingredientsChanged.emit(this.ingredients.slice());
    //Updates the list of bishops once a new one has been added
  }


}

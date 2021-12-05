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
}

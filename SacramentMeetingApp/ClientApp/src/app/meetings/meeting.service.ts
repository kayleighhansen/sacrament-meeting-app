import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Bishopric } from '../bishopric/bishopric.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  bishopric: Bishopric[] = [];
  bishopricMember: Bishopric;

  fetchBishopricEvent = new Subject<Bishopric[]>();
  bishopricListChanged = new Subject<Bishopric[]>();

  constructor(private http: HttpClient, 
              @Inject('BASE_URL') private baseURL: string) { }

  // how to get the api to deliver data here:
  fetchBishopric() {
    this.http.get<Bishopric>(this.baseURL + "api/Bishoprics")
    .pipe(
      map(responseData => {
        const postsArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key})
          }
        }
        return postsArray;
      })
    )
    .subscribe(bishopric => {
      this.bishopric = bishopric;
        this.fetchBishopricEvent.next(this.bishopric);

        console.log(this.bishopric);

        this.bishopric.sort((a , b) => 
        a.status > b.status ? 1 : b.status > a.status ? -1 : 0);
        this.bishopricListChanged.next(this.bishopric.slice());
    });
  }

}

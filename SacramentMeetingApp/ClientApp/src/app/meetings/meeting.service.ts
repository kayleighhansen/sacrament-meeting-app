import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Bishopric } from '../bishopric/bishopric.model';
import { Meeting } from './meeting.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Hymn } from './hymn.model';


@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  bishopric: Bishopric[] = [];
  bishopricMember: Bishopric;

  meetings: Meeting[] = [];
  meeting: Meeting;

  hymn: Hymn;
  hymns: Hymn[] = [];

  fetchBishopricEvent = new Subject<Bishopric[]>();
  fetchMeetingsEvent = new Subject<Meeting[]>();
  fetchHymnsEvent = new Subject<Hymn[]>();

  bishopricListChanged = new Subject<Bishopric[]>();
  meetingListChanged = new Subject<Meeting[]>();
  hymnListChanged = new Subject<Hymn[]>();

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseURL: string) { }

  fetchBishopric() {
    this.http.get<Bishopric>(this.baseURL + "api/Bishopric")
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

        this.bishopric.sort((a , b) => 
        a.status > b.status ? 1 : b.status > a.status ? -1 : 0);
        this.bishopricListChanged.next(this.bishopric.slice());
    });
  }

  fetchMeetings() {
    this.http.get<Meeting>(this.baseURL + "api/SacramentMeeting")
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
    .subscribe(meetings => {
      this.meetings = meetings;
        this.fetchMeetingsEvent.next(this.meetings);

        //e.log(this.meetings);

        this.meetings.sort((a , b) => 
        a.date > b.date ? 1 : b.date > a.date ? -1 : 0);
        this.meetingListChanged.next(this.meetings.slice());
    });
    return;
  }

  fetchHymns() {
    let hymnURL= 'https://cdn.statically.io/gh/pseudosavant/LDSHymns/c3a00214e2f879a855f5894b345596dd6c547b70/hymns.json';

    this.http
      .get<Hymn[]>(hymnURL)
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
      .subscribe(hymns => {
        this.hymns = hymns;
        this.fetchHymnsEvent.next(this.hymns);
      });

    return;
  }

  addMeeting(newMeeting) {

    this.http.post(`https://localhost:5001/api/SacramentMeeting/`, newMeeting)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  getMeeting(id: number) {
    return this.meetings.find((meeting) => meeting.id === id)
  }

  updateMeeting(newMeeting: Meeting, originalMeeting: Meeting) {

    console.log(newMeeting);
    console.log(originalMeeting);
    console.log(originalMeeting.id);

    this.http.put(this.baseURL + `api/SacramentMeeting/18`, newMeeting)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  deleteMeeting(id : string) {
    return this.http.delete(this.baseURL + "api/SacramentMeeting/18");
  }
}

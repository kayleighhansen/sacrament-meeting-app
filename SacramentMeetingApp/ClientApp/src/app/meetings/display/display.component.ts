import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';
import { MeetingService } from '../meeting.service';
import { Meeting } from '../meeting.model';
import { Subject, Subscription } from 'rxjs';
import { Hymn } from '../hymn.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['../../app.component.css']
})
export class DisplayComponent implements OnInit, OnDestroy {

  meeting: Meeting;
  meetings: Meeting[]=[];

  error:string;

  hymn: Hymn;
  hymns: Hymn[]=[];
  hymnName: string;

  openingHymnName: string;

  fetchMeetingsSubscription: Subscription;
  fetchHymnsSubscription: Subscription;

  fetchHymnsEvent = new Subject<Hymn[]>();
  hymnListChanged = new Subject<Hymn[]>();


  constructor(private location: Location, private locationStrategy: LocationStrategy, private meetingService: MeetingService, private http: HttpClient) { }

  ngOnInit() {
    this.getMeetingById();

  }

  getMeetingById() {
    this.meetingService.fetchMeetings();

    let id = this.location.path().replace("/home/", "");
        
    this.fetchMeetingsSubscription = this.meetingService.fetchMeetingsEvent.subscribe((result) => {
      result.forEach((x) => {
        if (x.id == parseInt(id)) {
          this.meeting = x ;
        } 
      }
    );
    this.openingHymnName = this.getHymnName();
    }, error => {
      this.error = error.message;
    });

  }

  getHymnName(): string {
    this.meetingService.fetchHymns();

    this.fetchHymnsSubscription = this.meetingService.fetchHymnsEvent.subscribe((result) => {
      result.forEach((x) => {
        if (x.songNumber == this.meeting.openingHymnNumber.toString()) {
          this.hymnName = x.name;
        }});
      });
    return this.hymnName;
  }

  ngOnDestroy(): void {
    this.fetchHymnsSubscription.unsubscribe();
    this.fetchMeetingsSubscription.unsubscribe();
  }

}

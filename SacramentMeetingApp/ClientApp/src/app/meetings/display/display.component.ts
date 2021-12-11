import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';
import { MeetingService } from '../meeting.service';
import { Meeting } from '../meeting.model';
import { Subject, Subscription } from 'rxjs';
import { Hymn } from '../hymn.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';



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

  fetchMeetingsSubscription: Subscription;
  fetchHymnsSubscription: Subscription;

  fetchHymnsEvent = new Subject<Hymn[]>();
  hymnListChanged = new Subject<Hymn[]>();

  openingHymnName: string;
  sacramentHymnName: string;
  intermediateHymnName: string;
  closingHymnName: string;
  dismissalHymnName: string;


  constructor(private location: Location, private locationStrategy: LocationStrategy, private meetingService: MeetingService, private http: HttpClient, private router: Router) { }

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
          console.log(this.meeting);
        } 
      }
    );
    this.getHymnName();
    }, error => {
      this.error = error.message;
    });

  }

  getHymnName() {
    this.meetingService.fetchHymns();

    this.fetchHymnsSubscription = this.meetingService.fetchHymnsEvent.subscribe((result) => {
      this.openingHymnName = result[this.meeting.openingHymnNumber - 1].name;
      //console.log(this.openingHymnName);

      this.sacramentHymnName = result[this.meeting.sacramentHymnNumber - 1].name;
      //console.log(this.sacramentHymnName);

      this.intermediateHymnName = result[this.meeting.intermediateHymnNumber - 1].name;
      //console.log(this.intermediateHymnName);

      this.closingHymnName = result[this.meeting.closingHymnNumber - 1].name;
      //console.log(this.closingHymnName);

      this.dismissalHymnName = result[this.meeting.closingHymnNumber - 1].name;
      //console.log(this.dismissalHymnName);
    });
  }

  onDelete(id) {
    this.meetingService.deleteMeeting(id).subscribe(() => { 
      this.meetings = [id];
      this.router.navigate(['/home']);
    });
  }

  ngOnDestroy(): void {
    this.fetchHymnsSubscription.unsubscribe();
    this.fetchMeetingsSubscription.unsubscribe();
    this.fetchHymnsEvent.unsubscribe();
  }

}

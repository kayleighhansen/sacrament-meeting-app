import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';
import { MeetingService } from '../meeting.service';
import { Meeting } from '../meeting.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['../../app.component.css']
})
export class DisplayComponent implements OnInit {

  meeting: Meeting;
  meetings: Meeting[]=[];

  error:string;

  fetchMeetingsSubscription: Subscription;

  constructor(private location: Location, private locationStrategy: LocationStrategy, private meetingService: MeetingService) { }

  ngOnInit() {
    // get meeting by id
    this.getMeetingById();

  }

  getMeetingById() {
    let id = this.location.path().replace("/home/", "");

    this.meetingService.fetchMeetings();
        
    this.fetchMeetingsSubscription = this.meetingService.fetchMeetingsEvent.subscribe((result) => {
      result.forEach((x) => {
        if (x.id == id) {
          this.meeting = x ;
        } 
      }
    );
    console.log(this.meeting);
    }, error => {
      this.error = error.message;
    });

  }

}

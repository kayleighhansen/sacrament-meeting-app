import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../meeting.service';
import { Meeting } from '../meeting.model';
import { Subscription } from 'rxjs';
import { MOCKMEETINGS } from '../MOCKMEETINGS';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['../../app.component.css']
})
export class MeetingComponent implements OnInit {

  meeting: Meeting;
  meetings: Meeting[] = [];

  private meetingChangeSub: Subscription;

  constructor(private meetingService: MeetingService) { }

  ngOnInit() {

    this.meetingService.fetchMeetings();

    this.meetingChangeSub = this.meetingService.meetingListChanged.subscribe(
      (meetings: Meeting[]) => {
        this.meetings = meetings;
        this.meetings.forEach((meeting) => {
          this.meeting = meeting;
          console.log(this.meeting.date);
        }); 
      }
    );

    
  }

  onSelected() {

  }

  ngOnDestroy(): void {
    this.meetingChangeSub.unsubscribe();
  }
}

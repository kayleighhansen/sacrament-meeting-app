import { Component, Input, OnInit } from '@angular/core';
import { MeetingService } from '../meeting.service';
import { Meeting } from '../meeting.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['../../app.component.css']
})
export class MeetingComponent implements OnInit {

  meeting: Meeting;
  meetings: Meeting[] = [];

  //@Input() meeting: Meeting;

  private meetingChangeSub: Subscription;

  constructor(private meetingService: MeetingService) { }

  ngOnInit() {

    this.meetingService.fetchMeetings();

    this.meetingChangeSub = this.meetingService.meetingListChanged.subscribe(
      (meetings: Meeting[]) => {
        this.meetings = meetings;
        this.meetings.forEach((meeting) => {
          this.meeting = meeting;
        }); 
      }
    );
  }

  ngOnDestroy(): void {
    this.meetingChangeSub.unsubscribe();
  }
}

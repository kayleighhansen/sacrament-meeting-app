import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../meeting.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['../../app.component.css']
})
export class MeetingComponent implements OnInit {

  constructor(private meetingService: MeetingService) { }

  ngOnInit() {
    //this.getBishopricList();
  }


}

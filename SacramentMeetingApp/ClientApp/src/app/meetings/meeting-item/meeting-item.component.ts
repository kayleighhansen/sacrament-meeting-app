import { Component, Input, OnInit } from '@angular/core';
import { Meeting } from '../meeting.model';

@Component({
  selector: 'app-meeting-item',
  templateUrl: './meeting-item.component.html',
  styleUrls: ['./meeting-item.component.css']
})
export class MeetingItemComponent implements OnInit {
  
  @Input() meeting: Meeting;

  constructor() { }

  ngOnInit() {
  }

}

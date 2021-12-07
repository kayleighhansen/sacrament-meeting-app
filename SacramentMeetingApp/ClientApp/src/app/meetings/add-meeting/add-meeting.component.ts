import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meeting } from '../meeting.model';
import { MeetingService } from '../meeting.service';
import { Prayer } from '../prayer.model';
import { Bishopric } from 'src/app/bishopric/bishopric.model';
import { Hymn } from '../hymn.model';
import { map } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['../../app.component.css']
})
export class AddMeetingComponent implements OnInit {

  public shown = false;
  public showMusic = false;

  fastSunday: boolean;
  specialMusic: boolean;

  prayer: Prayer;
  meeting: Meeting;
  bishopric: Bishopric;

  hymn: Hymn;
  hymns: Hymn[] = [];
  bishopricList: Bishopric[] = [];

  fetchHymnsEvent = new Subject<Hymn[]>();
  hymnListChanged = new Subject<Hymn[]>();

  fetchBishopricSubscription: Subscription;

  projectForm: FormGroup;

  constructor(private http: HttpClient, private meetingService: MeetingService) { }

  ngOnInit() {
    this.getHymnList();
    this.getBishopricList();

    this.projectForm = new FormGroup({
      'speaker': new FormControl(null),
      'topic': new FormControl(null),
    });

  }

  getHymnList() {
    let hymnURL= 'https://cdn.statically.io/gh/pseudosavant/LDSHymns/c3a00214e2f879a855f5894b345596dd6c547b70/hymns.json';

    let openingHymn = document.getElementById("openingHymn");
    let sacramentHymn = document.getElementById("sacramentHymn");
    let closingHymn = document.getElementById("closingHymn");
    let dismissalHymn = document.getElementById("dismissalHymn");

    this.http.get<Hymn[]>(hymnURL)
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
  
      this.hymns.forEach((hymn) => {
        var option = document.createElement("option");
        option.value = hymn.id.toString();
        option.text = hymn.songNumber + ", " + hymn.name;

        openingHymn.appendChild(option);
      })

      this.hymns.forEach((hymn) => {
        var option = document.createElement("option");
        option.value = hymn.id.toString();
        option.text = hymn.songNumber + ", " + hymn.name;

        sacramentHymn.appendChild(option);
      })

      this.hymns.forEach((hymn) => {
        var option = document.createElement("option");
        option.value = hymn.id.toString();
        option.text = hymn.songNumber + ", " + hymn.name;

        closingHymn.appendChild(option);
      })

      this.hymns.forEach((hymn) => {
        var option = document.createElement("option");
        option.value = hymn.id.toString();
        option.text = hymn.songNumber + ", " + hymn.name;

        dismissalHymn.appendChild(option);
      })

      this.fetchHymnsEvent.next(this.hymns);
      this.hymnListChanged.next(this.hymns.slice());
    });
  }

  getBishopricList() {

    this.meetingService.fetchBishopric();
    const selectList1 = document.getElementById("presidingId");
    const selectList2 = document.getElementById("conductingId");

    this.fetchBishopricSubscription = this.meetingService.fetchBishopricEvent.subscribe((result) => {

      this.bishopricList = result;
      console.log(this.bishopricList);

      this.bishopricList.forEach(res => {
        var option = document.createElement("option");
          option.value = res.id.toString();
          option.text = res.name + ", " + res.calling;

        if(res.status == true) {
          selectList1.appendChild(option);
        };

        var option = document.createElement("option");
          option.value = res.id.toString();
          option.text = res.name + ", " + res.calling;

        if(res.status == true) {
          selectList2.appendChild(option);
        };
        
      }); 
      
    });

  }

  onSubmit(form: NgForm) {

    const isFastSunday = document.getElementById("isFastSunday") as HTMLInputElement;
    if(isFastSunday.checked) {
      this.fastSunday = false;
    }
    else {
      this.fastSunday = true;
    };

    const isSpecialMusic = document.getElementById("musicCheckBox") as HTMLInputElement;
    if(isSpecialMusic.checked) {
      this.specialMusic = true;
    }
    else {
      this.specialMusic = false;
    };

    const value = form.value;

    const newContact = new Meeting(
      null,
      new Date().toDateString(),
      value.presidingId,
      value.conductingId,
      value.openingPrayer,
      value.closingPrayer,
      value.openingHymn,
      value.sacramentHymn,
      value.closingHymn,
      value.dismissalHymn,
      value.speakers,
      this.fastSunday,
      this.specialMusic,
      value.musician,
      value.song
    );

    console.log(newContact);

    // http post to the right url
  }

}

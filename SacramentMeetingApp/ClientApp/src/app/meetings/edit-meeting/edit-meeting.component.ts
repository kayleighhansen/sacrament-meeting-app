import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hymn } from '../hymn.model';
import { map } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MeetingService } from '../meeting.service';
import { Location, LocationStrategy } from '@angular/common';
import { Meeting } from '../meeting.model';


@Component({
  selector: 'app-edit-meeting',
  templateUrl: './edit-meeting.component.html',
  styleUrls: ['../../app.component.css']
})
export class EditMeetingComponent implements OnInit {

  error: string;

  hymn: Hymn;
  hymns: Hymn[] = [];

  meeting: Meeting;
  meetings: Meeting[]=[];

  fetchHymnsEvent = new Subject<Hymn[]>();
  hymnListChanged = new Subject<Hymn[]>();
  fetchMeetingsSubscription: Subscription;

  editMeetingForm: FormGroup;

  constructor(private location: Location, private locationStrategy: LocationStrategy, private http: HttpClient, private meetingService: MeetingService) { }

  ngOnInit() {
    this.getHymnList();

    this.getMeetingById();

    this.editMeetingForm = new FormGroup({
      'date': new FormControl(null, Validators.required),
      'presidingId': new FormControl(null, Validators.required),
      'conductingId': new FormControl(null, Validators.required),
      'openingPrayer': new FormControl(null, Validators.required),
      'closingPrayer': new FormControl(null, Validators.required),
      'openingHymn': new FormControl(null, Validators.required),
      'sacramentHymn': new FormControl(null, Validators.required),
      'intermediateHymn': new FormControl(null),
      'closingHymn': new FormControl(null, Validators.required),
      'dismissalHymn': new FormControl(null, Validators.required),
      'isFastSunday': new FormControl(null, Validators.required),
      'speakers': new FormArray([]),

      'isMusicSunday': new FormControl(null, Validators.required),
      'musician': new FormControl(null),
      'song': new FormControl(null)
    });


    // this.editMeetingForm.patchValue({
    //   'id': "",
    //   'date': this.meeting.date,
    //   'presidingId': this.meeting.presidingId,
    //   'conductorId': this.meeting.conductorId,
    //   'openingPrayer': this.meeting.openingPrayer,
    //   'closingPrayer': this.meeting.closingPrayer,
    //   'openingHymnNumber': this.meeting.openingHymnNumber,
    //   'sacramentHymnNumber': this.meeting.sacramentHymnNumber,
    //   'intermediateHymnNumber': this.meeting.intermediateHymnNumber,
    //   'closingHymnNumber': this.meeting.closingHymnNumber,
    //   'dismissalHymnNumber': this.meeting.dismissalHymnNumber,
    //   'speakers': this.meeting.speakers,
    //   'isFastSunday': this.meeting.isFastSunday,
    //   'isSpecialMusicNumber': this.meeting.isSpecialMusic,
    //   'specialMusicNumberMusician': this.meeting.musician,
    //   'specialMusicNumberSong': this.meeting.song,
    // });
  }

  getHymnList() {
    let hymnURL= 'https://cdn.statically.io/gh/pseudosavant/LDSHymns/c3a00214e2f879a855f5894b345596dd6c547b70/hymns.json';

    let openingHymn = document.getElementById("openingHymn");
    let sacramentHymn = document.getElementById("sacramentHymn");
    let intermediateHymn = document.getElementById("intermediateHymn");
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
  
      console.log(this.hymns[0].songNumber);

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

        intermediateHymn.appendChild(option);
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

  getMeetingById() {
    this.meetingService.fetchMeetings();

    let id = this.location.path().replace("/home/", "").replace("/edit", "");
        
    this.fetchMeetingsSubscription = this.meetingService.fetchMeetingsEvent.subscribe((result) => {
      result.forEach((x) => {
        if (x.id == parseInt(id)) {
          this.meeting = x ;
          console.log(this.meeting);
        } 
      }
    );
    }, error => {
      this.error = error.message;
    });

  }

  onAddSpeaker() {
    const label = document.createElement('label');
    label.innerHTML = "Speaker"
    const newSpeaker = new FormGroup({
      speaker: new FormControl(),
      topic: new FormControl()
    });

    console.log(newSpeaker.value);

    (<FormArray>this.editMeetingForm.get('speakers')).push(newSpeaker);
  }

  onSubmit() {
    console.log(this.editMeetingForm);
  }

  ngOnDestroy(): void {
    this.fetchMeetingsSubscription.unsubscribe();
    this.fetchHymnsEvent.unsubscribe();
    // this.fetchMeetingsEvent.unsubscribe();
  }
}

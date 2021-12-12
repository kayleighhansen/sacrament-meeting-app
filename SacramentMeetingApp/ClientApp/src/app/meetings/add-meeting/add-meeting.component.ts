import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meeting } from '../meeting.model';
import { MeetingService } from '../meeting.service';
import { Bishopric } from 'src/app/bishopric/bishopric.model';
import { Hymn } from '../hymn.model';
import { map } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { FormArray, NgForm } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['../../app.component.css']
})
export class AddMeetingComponent implements OnInit {

  public showSpeakers:boolean = false;
  public showMusic = false;

  fastSunday: boolean = false;
  specialMusic: boolean = false;

  // prayer: Prayer;
  meeting: Meeting;
  bishopric: Bishopric;

  hymn: Hymn;
  hymns: Hymn[] = [];
  bishopricList: Bishopric[] = [];
  form: Meeting;

  fetchHymnsEvent = new Subject<Hymn[]>();
  hymnListChanged = new Subject<Hymn[]>();

  fetchBishopricSubscription: Subscription;

  addMeetingForm: FormGroup;

  constructor(private http: HttpClient, private meetingService: MeetingService, private router: Router,) { }

  ngOnInit() {
    this.getHymnList();
    this.getBishopricList();

    this.getFormControls();
  }

  getFormControls() {
    this.addMeetingForm = new FormGroup({
      'date': new FormControl(null, Validators.required),
      'presidingId': new FormControl(null, Validators.required),
      'conductorId': new FormControl(null, Validators.required),
      'openingPrayer': new FormControl(null, Validators.required),
      'closingPrayer': new FormControl(null, Validators.required),
      'openingHymnNumber': new FormControl(null, Validators.required),
      'sacramentHymnNumber': new FormControl(null, Validators.required),
      'intermediateHymnNumber': new FormControl(null),
      'closingHymnNumber': new FormControl(null, Validators.required),
      'dismissalHymnNumber': new FormControl(null, Validators.required),
      'isFastSunday': new FormControl(null, Validators.required),
      'speakers': new FormArray([]),

      'isSpecialMusicNumber': new FormControl(null, Validators.required),
      'specialMusicNumberMusician': new FormControl(null),
      'specialMusicNumberSong': new FormControl(null)
    });
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

  getBishopricList() {
    this.meetingService.fetchBishopric();

    this.fetchBishopricSubscription = this.meetingService.bishopricListChanged.subscribe(
      (bishopric: Bishopric[]) => {
        this.bishopricList = bishopric;
        console.log(this.bishopricList);

        this.bishopricList.forEach((bishopric) => {
          this.bishopric = bishopric;
        }); 
      }
    );
  }

  onShowSpeakers() {
    console.log(this.showSpeakers);

    if (this.showSpeakers = false) {
      this.showSpeakers = true;
    }
  }

  onSubmit() {

    const value = this.addMeetingForm.value;
    const newMeeting = new Meeting(
      null,
      value.date,
      value.presidingId,
      value.conductorId,
      value.openingPrayer,
      value.closingPrayer,
      value.openingHymnNumber,
      value.sacramentHymnNumber,
      value.intermediateHymnNumber,
      value.closingHymnNumber,
      value.dismissalHymnNumber,
      value.speakers,
      value.isFastSunday,
      value.isSpecialMusicNumber,
      value.specialMusicNumberMusician,
      value.specialMusicNumberSong
    );

    console.log(newMeeting);

    this.meetingService.addMeeting(newMeeting);
  }

  onAddSpeaker() {
    const newSpeaker = new FormGroup({
      speaker: new FormControl(),
      topic: new FormControl()
    });

    console.log(newSpeaker.value);

    (<FormArray>this.addMeetingForm.get('speakers')).push(newSpeaker);

  }

  getSpeakerControls() {
    return (<FormArray>this.addMeetingForm.get('speakers')).controls;
  }

  ngOnDestroy(): void {
    this.fetchBishopricSubscription.unsubscribe();
  }
}

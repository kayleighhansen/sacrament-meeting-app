import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hymn } from '../hymn.model';
import { map } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MeetingService } from '../meeting.service';
import { Location, LocationStrategy } from '@angular/common';
import { Meeting } from '../meeting.model';
import { Bishopric } from 'src/app/bishopric/bishopric.model';


@Component({
  selector: 'app-edit-meeting',
  templateUrl: './edit-meeting.component.html',
  styleUrls: ['../../app.component.css']
})
export class EditMeetingComponent implements OnInit {

  error: string;
  presiding: string;
  conductor: string;

  isSpecialMusic: boolean = false;

  hymn: Hymn;
  hymns: Hymn[] = [];

  bishopric: Bishopric;
  bishopricList: Bishopric[] = [];


  meeting: Meeting;
  originalMeeting: Meeting;
  meetings: Meeting[]=[];

  fetchHymnsEvent = new Subject<Hymn[]>();
  hymnListChanged = new Subject<Hymn[]>();
  fetchMeetingsSubscription: Subscription;

  fetchBishopricSubscription: Subscription;


  editMeetingForm: FormGroup;

  constructor(private location: Location, private locationStrategy: LocationStrategy, private http: HttpClient, private meetingService: MeetingService) { }

  ngOnInit() {
    this.initForm();    
  }

  private initForm() {

    this.editMeetingForm = new FormGroup({
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

    //this.getBishopric();
    this.getHymnList();
    this.getMeetingById();
    

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
          
          this.initPatch();
          this.getBishopricMember();
        } 
      }
    );
    }, error => {
      this.error = error.message;
    });
  }

  initPatch() {
    this.editMeetingForm.patchValue({
      'id': "",
      'date': this.meeting.date,
      'presidingId': this.meeting.presidingId,
      'conductorId': this.meeting.conductorId,
      'openingPrayer': this.meeting.openingPrayer,
      'closingPrayer': this.meeting.closingPrayer,
      'openingHymnNumber': this.meeting.openingHymnNumber,
      'sacramentHymnNumber': this.meeting.sacramentHymnNumber,
      'intermediateHymnNumber': this.meeting.intermediateHymnNumber,
      'closingHymnNumber': this.meeting.closingHymnNumber,
      'dismissalHymnNumber': this.meeting.dismissalHymnNumber,
      'speakers': this.meeting.speakers,
      'isFastSunday': this.meeting.isFastSunday,
      'isSpecialMusicNumber': this.meeting.isSpecialMusicNumber,
      'specialMusicNumberMusician': this.meeting.specialMusicNumberMusician,
      'specialMusicNumberSong': this.meeting.specialMusicNumberSong,
    });
  }

  getBishopricMember() {

    this.meetingService.fetchBishopric();

    this.fetchBishopricSubscription = this.meetingService.bishopricListChanged.subscribe(
      (bishopric: Bishopric[]) => {
        this.bishopricList = bishopric;
        //this.presiding = this.bishopricList[this.meeting.presidingId - 1].name;
        //this.conductor = this.bishopricList[this.meeting.conductorId - 1].name;
      }
    );
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
    const value = this.editMeetingForm.value;

    this.originalMeeting = this.meetingService.getMeeting(this.meeting.id);

    const newMeeting = new Meeting(
      15,
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
      value.isFastSunday,
      value.specialMusicNumberMusician,
      value.specialMusicNumberSong
    );

    console.log(newMeeting);

    this.meetingService.updateMeeting(newMeeting, this.originalMeeting); 


  }

  ngOnDestroy(): void {
    this.fetchMeetingsSubscription.unsubscribe();
    this.fetchHymnsEvent.unsubscribe();
    // this.fetchMeetingsEvent.unsubscribe();
  }
}

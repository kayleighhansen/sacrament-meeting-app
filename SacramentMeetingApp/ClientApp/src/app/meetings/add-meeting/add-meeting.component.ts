import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meeting } from '../meeting.model';
import { MeetingService } from '../meeting.service';
import { Prayer } from '../prayer.model';
import { Bishopric } from 'src/app/bishopric/bishopric.model';
import { Hymn } from '../hymn.model';
import { map } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { FormArray, NgForm } from '@angular/forms';
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

  addMeetingForm: FormGroup;

  constructor(private http: HttpClient, private meetingService: MeetingService) { }

  ngOnInit() {
    this.getHymnList();
    this.getBishopricList();

    this.addMeetingForm = new FormGroup({
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

    console.log(this.addMeetingForm.get('newSpeaker'));

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

  onSubmit() {
    console.log(this.addMeetingForm);
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
}

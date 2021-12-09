import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hymn } from '../hymn.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-edit-meeting',
  templateUrl: './edit-meeting.component.html',
  styleUrls: ['../../app.component.css']
})
export class EditMeetingComponent implements OnInit {

  hymn: Hymn;
  hymns: Hymn[] = [];

  fetchHymnsEvent = new Subject<Hymn[]>();
  hymnListChanged = new Subject<Hymn[]>();

  editMeetingForm: FormGroup;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getHymnList();

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

  LoadDetails() {

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
}

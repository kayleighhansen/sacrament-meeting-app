import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Bishopric } from '../bishopric.model';
import { BishopricService } from '../bishopric.service';

@Component({
  selector: 'app-bishopric-edit',
  templateUrl: './bishopric-edit.component.html',
  styleUrls: ['./bishopric-edit.component.css']
})
export class BishopricEditComponent implements OnInit {

  id: number;
  editMode = false;
  bishopricForm: FormGroup;
  callings = ['Bishop', '1st Counselor', '2nd Counselor'];
  bishoprics: Bishopric[];
  displayErrorMessage = false;
  errorMessage = {
    oldName: '',
    oldCalling: '',
    newName: '',
    newCalling: ''
  }

  constructor(private route: ActivatedRoute, private bishopricService: BishopricService, private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      )
  }

  private initForm() {

    let bishopricName = '';
    let bishopricCalling = '';

    if (this.editMode) {
      const bishopric = this.bishopricService.getBishopric(this.id);
      bishopricName = bishopric.name;
      bishopricCalling = bishopric.calling;

    }

    this.bishopricForm = new FormGroup({
      'name': new FormControl(bishopricName, [Validators.required]),
      'calling': new FormControl(bishopricCalling, [Validators.required])
    })

  }


  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  //Need to include a function (probably a check in the onSubmit function) 
  // that checks if that calling is already filled..If it is then display a 
  // warning message that states: "{{ name }} already fills that calling. 
  // Please delete {{ name }} before trying to someone to the {{ calling }} calling."

  onSubmit() {

    // get the bishoprics array
    this.bishoprics = this.bishopricService.getBishoprics();

    console.log(this.bishoprics);
    //loop through bishoprics
    for (let i = 0; i < this.bishoprics.length; i++) {

      // set current index equal to bishopric
      let bishopric = this.bishoprics[i];

      // console.log('*********************************');
      console.log(bishopric);
      // console.log('*********************************');

      // find where status === true && calling is equal to the new bishopric member
      if (bishopric.status && (bishopric.calling === this.bishopricForm.get('calling').value)) {
        this.onDisplayErrorMessage(bishopric.name, bishopric.calling,
          this.bishopricForm.get('name').value, this.bishopricForm.get('calling').value);

        console.log('Someone in the Bishopric has that calling');
        return;
      } else {
        if (this.editMode) {
          this.bishopricService.updateBishopric(this.id, this.bishopricForm.value);
        } else {
          this.bishopricService.addBishopric(this.bishopricForm.value);
        }
      }
    }
  }

  onDisplayErrorMessage(oldName, oldCalling, newName, newCalling) {
    this.displayErrorMessage = true;

    this.errorMessage.oldName = oldName
    this.errorMessage.oldCalling = oldCalling;
    this.errorMessage.newName = newName;
    this.errorMessage.newCalling = newCalling;
  }
}

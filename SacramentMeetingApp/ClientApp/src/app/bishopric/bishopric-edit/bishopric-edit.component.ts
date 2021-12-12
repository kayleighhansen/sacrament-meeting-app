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
  editedBishopric: Bishopric;
  oldBishopric: Bishopric;
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
<<<<<<< HEAD
      bishopricCalling = bishopric.calling;

=======
      bishopricCalling = bishopric.calling
>>>>>>> f300abe148e93eadec1c08c30e7eaa40482d70ec
    }

    this.bishopricForm = new FormGroup({
      'name': new FormControl(bishopricName, [Validators.required]),
      'calling': new FormControl(bishopricCalling, [Validators.required])
    })

  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {

    //Store the new values for bishop based on whether we are in edit mode or not
    // Will need to double check that the editting portion works
    // Might have problems not being able to overwrite previous bishopric members
    // if (this.editMode) {
    //   this.editedBishopric = this.bishopricService.getBishopric(this.id); // troublesome, will overwrite current form with old info?
    // } else {
    //   this.editedBishopric = this.bishopricForm.value;
    // }

    this.editedBishopric = this.bishopricForm.value;

    this.bishoprics = this.bishopricService.getBishoprics();

    this.bishoprics.forEach(
      (bishopric) => {
        if (bishopric.status && (bishopric.calling === this.editedBishopric.calling)) {
          this.oldBishopric = bishopric;
        }
      }
    )

    if (this.oldBishopric) {
      this.onDisplayErrorMessage(this.oldBishopric.name, this.oldBishopric.calling,
        this.editedBishopric.name, this.editedBishopric.calling);
    } else {
      if (this.editMode) {
        this.bishopricService.updateBishopric(this.id, this.bishopricForm.value);
      } else {
        this.bishopricService.addBishopric(this.bishopricForm.value);
      }
      this.onCancel();
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

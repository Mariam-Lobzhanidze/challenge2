import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  cvForm: FormGroup;
  urlPattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  ngOnInit() {
    this.cvForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl('XXX-XXX-XXX', [
        Validators.required,
        Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{3}'),
      ]),
      urls: new FormArray([
        new FormControl(null, [
          Validators.required,
          Validators.pattern(this.urlPattern),
        ]),
      ]),
      education: new FormArray([new FormControl(null, Validators.required)]),
      // experience: new FormArray([new FormControl(null, Validators.required)]),
      experiences: new FormGroup({
        experience: new FormArray([new FormControl(null, Validators.required)]),
        start: new FormArray([new FormControl(null, Validators.required)]),
        end: new FormArray([new FormControl(null, Validators.required)]),
      }),
    });
  }

  onSubmit() {
    console.log(this.cvForm);
  }

  onAddRecourses() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.cvForm.get('urls')).push(control);
  }

  onAddEducation() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.cvForm.get('education')).push(control);
  }

  onAddExperience() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.cvForm.get('experiences.experience')).push(control);

    (<FormArray>this.cvForm.get('experiences.start')).push(
      new FormControl(null, Validators.required)
    );

    (<FormArray>this.cvForm.get('experiences.end')).push(
      new FormControl(null, Validators.required)
    );
  }
}

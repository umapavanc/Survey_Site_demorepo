import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from 'src/app/partials/base-page/base-page.component';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent extends BasePageComponent implements OnInit {
  myForm!: FormGroup;

  private saveData = () => {
    console.log("Hello Hello");
  }
  constructor(route: ActivatedRoute, private formBuilder: FormBuilder) {  
    super(route);
   }


  override ngOnInit(): void {
  }


  onSubmit(formData: { [x: string]: any; }) {
    var name = formData['name'];
  }

  formGroup: any;
  

}

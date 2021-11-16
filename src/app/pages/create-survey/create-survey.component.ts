import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from 'src/app/partials/base-page/base-page.component';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent extends BasePageComponent implements OnInit {
  ActivatedRoute: any;
  constructor(
    route: ActivatedRoute, 
    private formBuilder: FormBuilder) {  
    super(route);
   }

   myForm!: FormGroup;

   override ngOnInit(){
     this.myForm = this.formBuilder.group({
       id: [],
       question: ['', Validators.required],
       answer: ['', Validators.required]
     });
   }

  onSubmit() {
    this.ActivatedRoute.navigate(['active-surveys']);
  }  

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasePageComponent } from 'src/app/partials/base-page/base-page.component';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent extends BasePageComponent implements OnInit {

  constructor(route: ActivatedRoute) { 
    super(route)
  }

  override ngOnInit(): void {
  }

}

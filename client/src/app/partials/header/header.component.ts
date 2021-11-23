import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
    isAuth = false;
    private userSub: Subscription;
    
  constructor(
    private authService: AuthService
    ) {}

  ngOnInit() {
    this.userSub= this.authService.user.subscribe(user => {
      this.isAuth = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  onLogout(){
    this.authService.logout();
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessage } from 'angular-flash-message';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessage
  ) { }

  ngOnInit() {
  }

  onLogoutClick() {
    console.log('onLogoutClick() event raised');
    this.authService.logout();
    this.flashMessage.success('You are logged out', { dalay: 3000 });
    this.router.navigate(['/login']);
    return false;
  }
}

import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessage } from 'angular-flash-message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private flashMessage: FlashMessage,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Reguired Fields
    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.danger('Please fill in all fields', { dalay: 3000 });
      return false;
    }

    // Validate Fields
    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessage.danger('Please use a valid email', { dalay: 3000 });
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessage.success('You are now registered and can log in', { dalay: 3000 });
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.danger('Something went wrong', { dalay: 3000 });
        this.router.navigate(['/register']);
      }
    });
  }
}

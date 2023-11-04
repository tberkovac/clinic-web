import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, RequiredValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenResponse } from 'src/app/models/tokenResponse';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router) {

  }

  login() {
    console.log(this.form.valid)
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe({
        next: (tokenResponse: TokenResponse) => {
          const role = tokenResponse.role;
          if (role === 'Admin') {
            this.router.navigate(['admission-dashboard'])
          } else if (role === 'Doctor') {
            this.router.navigate(['doctor-dashboard'])
          }
        },
        error: (err) => console.log(err)
      })
    }
  }
  @Input() error!: string | null;

}

import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {


  loginForm: FormGroup;
  error = false;

  constructor( private router: Router,
               private authService: AuthService,
               public formBuilder: FormBuilder ) {

    this.loginForm = this.formBuilder.group( {
      username: ['', Validators.required],
      password: ['', Validators.required]
    } );

  }

  async authLoginAction() {
    this.authService.login( this.loginForm.value.username, this.loginForm.value.password )
      .subscribe( async resp => {
        this.authService.token = resp['token'];
        this.authService.id = resp['id'];
        this.authService.userId = this.loginForm.value.username;
        await this.authService.saveSession();
        await this.authService.getAccess();
        await this.router.navigate(['/dashboard']);
      }, err => {
        this.error = true;
        console.error( err );
    });

  }

}

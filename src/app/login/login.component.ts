import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  operation = 'login';
  email: string = null;
  password: string = null;
  nick: string = null;
  status = 'online';
  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
  }
  login() {
    this.authenticationService.loginWithEmail(this.email, this.password)
      .then(
        (data) => {
          console.log(data);
          this.router.navigate(['home']);
        }
      ).catch(
        (error) => {
          console.log('Ocurrio un error: ');
          console.error(error);
        }
      );
  }
  async loginWithFacebook() {
    try {
      const data = await this.authenticationService.loginWithFacebook();
      console.log('Login Succesfull with Facebook.');
    } catch (error) {
      console.error(error);
    }
  }
  register() {
    this.authenticationService.registerWithEmail(this.email, this.password)
      .then(
        (data) => {
          const user = {
            uid: data.user.uid,
            email: this.email,
            nick: this.nick,
            status: this.status
          };
          this.userService.createUser(user)
            .then(
              (userData) => {
                console.log(userData);
                console.log(user);
              })
            .catch(
              (err) => {
              console.error(err);
            });
        }
      ).catch(
        (error) => {
          console.log('Ocurrio un error: ');
          console.error(error);
        }
      );
  }

}

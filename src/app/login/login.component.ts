import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credential = firebase.auth.FacebookAuthProvider.credential(access_token);
  operation: string = 'login';
  email: string = null;
  password: string = null;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }
  login() {
    this.authenticationService.loginWithEmail(this.email, this.password)
      .then(
        (data) => {
          alert('Logeado correctamente');
          console.log(data);
        }
      ).catch(
        (error) => {
          console.log('Ocurrio un error: ');
          console.error(error);
        }
      );
  }
  loginWithFacebook() {
    firebase.auth()
      .signInAndRetrieveDataWithCredential(this.credential)
      .catch(function (error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        console.error(`
      :-----:Error register:-----:
      Code: ${errorCode},
      Message: ${errorMessage},
      Email: ${email},
      Credentials: ${credential}
      :--------------------------:
      `);
      });

  }
  register() {
    this.authenticationService.registerWithEmail(this.email, this.password)
      .then(
        (data) => {
          alert('Registrado correctamente');
          console.log(data);
        }
      ).catch(
        (error) => {
          console.log('Ocurrio un error: ');
          console.error(error);
        }
      );
  }

}

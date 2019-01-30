import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  friends: User[];
  query: string = '';
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router) {
    this.userService.getUsers().valueChanges().subscribe(
      (data: User[]) => { this.friends = data; },
      (err) => { console.error(err); });
  }
  logout() {
    this.authenticationService.logOut()
      .then((data) => {
        this.router.navigate(['/login']);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  ngOnInit() {
  }

}

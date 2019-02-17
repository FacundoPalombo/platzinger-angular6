import { FriendRequestComponent } from './modals/friend-request/friend-request.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { User } from './interfaces/user';
import { FriendRequestService } from './services/friend-request.service';
import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'platzinger-angular6';
  user: User;
  friendRequests: any[] = [];
  mailsShown: any[] = [];
  constructor(
    public router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private friendRequestService: FriendRequestService,
    private dialogService: DialogService) {
      this.authenticationService.getStatus()
      .subscribe((status) => {
        this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
          this.user = data;
          this.friendRequestService.getFriendRequestsForEmail(this.user.email).valueChanges()
          .subscribe(
            (requests: any) => {
              this.friendRequests = requests;
              this.friendRequests = this.friendRequests.filter((r) => {
                return r.status !== 'accepted' && r.status !== 'rejected';
              });
              this.friendRequests.forEach((r) => {
                if (this.mailsShown.indexOf(r.sender) === -1) {
                  this.mailsShown.push(r.sender);
                  this.dialogService.addDialog(FriendRequestComponent, {scope: this, currentRequest: r});
                }
              });
            },
            (err) => console.error(err)
          );
        });
      });
    }
}

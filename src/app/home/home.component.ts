import { FriendRequestService } from './../services/friend-request.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  friends: User[];
  query = '';
  friendEmail = '';
  messageFriendRequest = '';
  user: User;
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private ngbModal: NgbModal,
    private friendRequestService: FriendRequestService) {
    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges()
        .subscribe((data: User) => {
          this.user = data;
          if (this.user.friends) {
            this.user.friends = Object.values(this.user.friends);
            console.log(this.user.friends);
          }
        });
    });
    this.userService.getUsers().valueChanges().subscribe(
      (data: User[]) => this.friends = data,
      (err) => console.error(err));
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
  openModal(content) {
    this.ngbModal.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  sendFriendRequest() {
    const friendRequest = {
      timestamp: Date.now(),
      receiverEmail: this.friendEmail,
      messageFriendRequest: this.messageFriendRequest,
      sender: this.user.uid,
      status: 'pending'
    };
    this.friendRequestService.createFriendRequest(friendRequest)
      .then(() => { alert('Solicitud Enviada.'); })
      .catch((err) => { console.error(err); });
  }
  closeModal() {
    this.ngbModal.dismissAll();
  }
  ngOnInit() {
  }

}

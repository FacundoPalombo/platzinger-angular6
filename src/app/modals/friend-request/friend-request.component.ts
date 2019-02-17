import { FriendRequestService } from './../../services/friend-request.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';

export interface PromptModel {
  scope: any;
  currentRequest: any;
}

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent extends DialogComponent<PromptModel, any> implements PromptModel {
  scope: any;
  currentRequest: any;
  shouldAdd = 'yes';
  constructor(
    public dialogService: DialogService,
    private userService: UserService,
    private friendRequestService: FriendRequestService
  ) {
    super(dialogService);
   }
   accept() {
     if (this.shouldAdd == 'yes') {
       this.friendRequestService.setFriendRequestStatus(this.currentRequest, 'accepted')
       .then((data) => {
        console.log(data);
        this.userService.addFriend(this.scope.user.uid, this.currentRequest.sender);
       })
       .catch((error) => console.error(error));
     } else if (this.shouldAdd == 'no') {
      this.friendRequestService.setFriendRequestStatus(this.currentRequest, 'denied')
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
     } else if (this.shouldAdd == 'later') {
      this.friendRequestService.setFriendRequestStatus(this.currentRequest, 'later')
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
     }
   }
}

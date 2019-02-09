import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { ConversationService } from '../services/conversation.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  friendId: any;
  friends: User[];
  friend: User;
  user: User;
  textMessage: string;
  conversation_id: string;
  conversation: any[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private conversationService: ConversationService,
    private authenticationService: AuthenticationService) {

    this.friendId = this.activatedRoute.snapshot.params['uid'];
    console.log(this.friendId);
    this.authenticationService.getStatus().subscribe(
      (session) => {
        this.userService.getUserById(session.uid).valueChanges().subscribe(
          (user: User) => {
            this.user = user;
            this.userService.getUserById(this.friendId).valueChanges().subscribe(
              (data: User) => {
                this.friend = data;
                const ids = [this.user.uid, this.friend.uid].sort();
                this.conversation_id = ids.join('|');
                this.getConversation();
              },
              (err) => { console.error(err); }
            );
          });
      },
      (error) => console.error(error));
  }
  ngOnInit() {
  }
  sendMessage() {
    const message = {
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      receiver: this.friend.uid
    };

    this.conversationService.createConversation(message)
      .then(() => {
        this.textMessage = '';
      });
  }
  getConversation() {
    this.conversationService.getConversation(this.conversation_id).valueChanges()
    .subscribe(
      (data) => {
        console.log(data);
        this.conversation = data;
      },
      (error) => { console.error(error); }
    );
  }
}

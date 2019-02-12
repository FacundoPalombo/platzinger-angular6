import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { ConversationService } from '../services/conversation.service';
import { AuthenticationService } from '../services/authentication.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

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
  shaker = false;
  image: any;
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
  sendImage(img) {
    const message = {
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: img,
      sender: this.user.uid,
      seen: false,
      receiver: this.friend.uid,
      type: 'image'
    };
    this.conversationService.createConversation(message)
    .then(() => {
      this.image = '';
    });
  }
  sendMessage() {
    const message = {
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      seen: false,
      receiver: this.friend.uid,
      type: 'text'
    };

    this.conversationService.createConversation(message)
      .then(() => {
        this.textMessage = '';
      });
  }
  sendShaker() {
    const message = {
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: null,
      sender: this.user.uid,
      seen: false,
      receiver: this.friend.uid,
      type: 'shaker'
    };

    this.conversationService.createConversation(message)
      .then(() => {
        this.shakeScreen();
      });
  }
  shakeScreen() {
    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
    this.shaker = true;
    window.setTimeout(() => {
      this.shaker = false;
    }, 1000);
  }
  getConversation() {
    this.conversationService.getConversation(this.conversation_id).valueChanges()
      .subscribe(
        (data) => {
          this.conversation = data;
          this.conversation.forEach((message) => {
            console.log(message.seen);
            if (!message.seen) {
              message.seen = true;
              this.conversationService.editConversation(message);
              if (message.type === 'text') {
              const audio = new Audio('assets/sound/new_message.m4a');
              audio.play();
              }
            }
            console.log(data);
          });
        },
        (err) => { console.error(err); }
      );
  }
  getUserNickById(id: string) {
    if (id === this.friend.uid) {
      return this.friend.nick;
    } else {
      return this.user.nick;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  friendId: any;
  friends: User[];
  friend: User;
  constructor(private activatedRoute: ActivatedRoute) {
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    let myUser: User = {
      nick: 'Facundo',
      subnick: 'Hello world!',
      email: 'facu@facu.com',
      age: 22,
      friend: true,
      uid: 1
    };
    let eduardo: User = {
      nick: 'Eduardo',
      subnick: 'Hola! Soy Eduardo!',
      email: 'eduard@gmail.com',
      age: 24,
      friend: false,
      uid: 2
    };
    let jorge: User = {
      nick: 'Jorgito',
      subnick: 'h3h3 xD',
      email: 'jor_gito@live.com',
      age: 16,
      friend: true,
      uid: 3
    };
    let coco: User = {
      nick: 'Coco',
      subnick: 'Estan todas buenas menos mi jermu',
      email: 'basilecoco89@msn.com',
      age: 28,
      friend: true,
      uid: 4
    };
    let hernan: User = {
      nick: 'Herni uwu',
      subnick: 'xd',
      email: 'herniwi@awadeuwu.com',
      age: 69,
      friend: false,
      uid: 5
    };
    this.friends = [
      myUser,
      eduardo,
      jorge,
      coco,
      hernan
    ];
    this.friend = this.friends.find((record) => {
      return record.uid === this.friendId;
    });

  }
  // console.log(this.friendId);
  ngOnInit() {
  }

}

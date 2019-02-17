import { User } from './../interfaces/user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private angularFireDatabase: AngularFireDatabase) { }
  getUsers() {
    return this.angularFireDatabase.list('/users');
  }
  getUserById(uid) {
    return this.angularFireDatabase.object(`/users/${uid}`);
  }
  createUser(user) {
    return this.angularFireDatabase.object(`/users/${user.uid}`).set(user);
  }
  editUser(user) {
    return this.angularFireDatabase.object(`/users/${user.uid}`).update(user);
  }
  setAvatar(avatarUrl, user: User) {
    return this.angularFireDatabase.object(`/users/${user.uid}/avatar/`).set(avatarUrl);
  }
  addFriend(userId, friendUid) {
      this.angularFireDatabase.object(`/users/${userId}/friends/${friendUid}/`).set(friendUid);
      this.angularFireDatabase.object(`/users/${friendUid}/friends/${userId}/`).set(userId);
  }
}

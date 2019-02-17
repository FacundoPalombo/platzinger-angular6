import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {

  constructor(private angularFireDatabase: AngularFireDatabase) { }

  createFriendRequest(request) {
    const cleanEmail = request.receiverEmail.replace('.', ',');
    return this.angularFireDatabase
    .object(`requests/${cleanEmail}/${request.sender}`)
    .set(request);
  }
  setFriendRequestStatus(request, status) {
    const cleanEmail = request.receiverEmail.replace('.', ',');
    return this.angularFireDatabase
    .object(`requests/${cleanEmail}/status`)
    .set(status);
  }
  getFriendRequestsForEmail(email) {
    const cleanEmail = email.replace('.', ',');
    return this.angularFireDatabase.list(`requests/${cleanEmail}`);
  }
}

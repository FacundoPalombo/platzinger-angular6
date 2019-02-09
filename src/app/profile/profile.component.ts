import { AngularFireStorage } from '@angular/fire/storage';
import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  picture: any;
  constructor(private userService: UserService,
    private authenticationService: AuthenticationService,
    private angularFireStorage: AngularFireStorage) {
    this.authenticationService.getStatus().subscribe(
      (status) => {
        this.userService.getUserById(status.uid).valueChanges().subscribe(
          (data: User) => {
            this.user = data;
            console.log(this.user);
          },
          (error) => {
            console.error(error);
          }
        );
      }, (error) => {
        console.error(error);
      });
  }
  ngOnInit() {
  }

  saveSettings() {
    if (this.croppedImage) {
      const currentPictureId = Date.now();
      const pictures =
      this.angularFireStorage.ref(`pictures/${currentPictureId}.jpg`).putString(this.croppedImage, 'data_url')
      .then((result) => {
        this.picture = this.angularFireStorage.ref(`pictures/${currentPictureId}/.jpg`).getDownloadURL()
        .subscribe((p) => {
          this.userService.setAvatar(p, this.user.uid)
          .then(() => {
            alert('avatar subido correctamente');
          })
          .catch((err) => {
            console.log('Error al subir la imagen');
            console.error(err);
          });
        });
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });
    } else {

      this.userService.editUser(this.user)
        .then(
          (data) => {
            alert(`Datos modificados correctamente : <br> ${data}`);
          },
          (error) => {
            console.error(error);
          }
        );
    }
    this.userService.editUser(this.user)
      .then(
        (data) => {
          alert(`Datos modificados correctamente : <br> ${data}`);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }
}

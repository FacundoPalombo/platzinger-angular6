import { Observable } from 'rxjs';
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
  pictureUrl: Observable <string | any>;
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
      // Picture uploader
      this.angularFireStorage.ref(`pictures/${currentPictureId}.jpg`).putString(this.croppedImage, 'data_url')
      .then((result) => {
        this.angularFireStorage.ref(`pictures/${currentPictureId}.jpg`).getDownloadURL()
        .subscribe((picture) => {
          this.pictureUrl = picture;
          this.userService.setAvatar(this.pictureUrl, this.user)
          .then(() => {
          console.log(`Avatar subido exitosamente.`);
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
    console.log('Image loaded succesfully');
  }
  loadImageFailed() {
   alert(`Failed to load image`);
  }
}

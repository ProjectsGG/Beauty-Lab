import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HeroService } from '../../services/hero.service';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  content = 'photos';
  data: any;
  imgSrc: any = null;
  base64: any;
  constructor(
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private hero: HeroService,
    private service: UserService,
    private toastr: ToastService
  ) {}

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('user'));
  }
  segmentChanged(ev: any) {
    this.hero.getDomain();
    this.content = ev.detail.value;
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Gallery',
          icon: 'images',
          handler: () => {
            this.openGallery();
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then(
      imageData => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.imgSrc = 'data:image/jpeg;base64,' + imageData;
        this.service.setImgProfile(this.imgSrc).subscribe((r: any) => {
          if (r.ok) {
            this.toastr.success(r.message);
            this.hero.setUser(r.user);
            localStorage.setItem('user', JSON.stringify(r.user));
          } else {
            this.toastr.error(r.error);
          }
        });
        // let base64Image = 'data:image/jpeg;base64,' + imageData;
      },
      err => {
        // Handle error
      }
    );
  }
  private openGallery(): void {
    const cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    this.camera.getPicture(cameraOptions)
      .then(imageData => {
        this.imgSrc = 'data:image/jpeg;base64,' + imageData;
        this.service.setImgProfile(this.imgSrc).subscribe((r: any) => {
          if (r.ok) {
            this.toastr.success(r.message);
            this.hero.setUser(r.user);
            localStorage.setItem('user', JSON.stringify(r.user));
          } else {
            this.toastr.error(r.error);
          }
        });
      },
      err => console.log(err));
  }
}

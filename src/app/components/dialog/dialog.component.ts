import { LyDialog, LyDialogRef } from '@alyle/ui/dialog';
import { ImgCropperEvent } from '@alyle/ui/image-cropper';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/user/auth.service';
import { CropperDialog } from '../cropper-dialog/cropper-dialog.component';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  isLoading: boolean=false;
  cropped?: string;
  profile:any;
  constructor(
    public dialogRef: LyDialogRef,
    private _dialog: LyDialog,
    private _cd: ChangeDetectorRef,
    private authService:AuthService
  ) { }
  ngOnInit(): void {

  }

  openCropperDialog(event: Event) {
    this.cropped = null!;
    this._dialog.open<ProfileDialogComponent, Event>(ProfileDialogComponent, {
      data: event,
      width: 320,
      disableClose: true
    }).afterClosed.subscribe((result?: ImgCropperEvent) => {
      if (result) {
        this.cropped = result.dataURL;
        this._cd.markForCheck();
      }
    });
  }
  saveImage(){
    this.isLoading = true;
    console.log(this.cropped);
    this.authService.updateUserPhoto(this.cropped);
    this.dialogRef.close();
  }

}

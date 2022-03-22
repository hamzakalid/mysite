import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LyDialog } from '@alyle/ui/dialog';
import { CropperDialog } from 'src/app/components/cropper-dialog/cropper-dialog.component';
import { ImgCropperEvent } from '@alyle/ui/image-cropper';


import "/node_modules/froala-editor/js/plugins/align.min.js";
import "/node_modules/froala-editor/js/plugins/colors.min.js";
import "/node_modules/froala-editor/js/plugins/font_size.min.js";
import "/node_modules/froala-editor/js/plugins/image.min.js";
import "/node_modules/froala-editor/js/plugins/line_height.min.js";
import "/node_modules/froala-editor/js/plugins/paragraph_format.min.js";
import "/node_modules/froala-editor/js/plugins//table.min.js";
import "/node_modules/froala-editor/js/plugins/quote.min.js";
import "/node_modules/froala-editor/js/plugins/url.min.js";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';



@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  cropped?: string;

  postForm = new FormGroup({
    title: new FormControl('',{
      validators: [Validators.required,Validators.maxLength(255)]
    }),
    content: new FormControl('',{
      validators:[Validators.required]
    })
  })
  constructor(
    private _dialog: LyDialog,
    private postService:PostsService,
    private _cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  openCropperDialog(event: Event) {
    this.cropped = null!;
    this._dialog.open<CropperDialog, Event>(CropperDialog, {
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


  onSubmit(){
    const post ={
      title:this.postForm.get('title')?.value,
      content:this.postForm.get('content')?.value,
      cover: this.cropped,
    }

    this.postService.createPost(post);
  }

}

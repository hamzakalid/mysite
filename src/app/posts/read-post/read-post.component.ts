import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LyIconService } from '@alyle/ui/icon';
import { LyTheme2 } from '@alyle/ui';
import { PostsService } from '../posts.service';
import { FormControl } from '@angular/forms';
import { Comment } from '../comment.module';

const styles = ({
  icon: {
    marginAfter: '.5em'
  },
  iconLarge: {
    fontSize: '48px'
  },
  iconExtraLarge: {
    fontSize: '72px'
  }
});
@Component({
  selector: 'app-read-post',
  templateUrl: './read-post.component.html',
  styleUrls: ['./read-post.component.css']
})
export class ReadPostComponent implements OnInit {
  readonly classes = this._theme.addStyleSheet(styles);
  replayIndex:number = -1;
  comment = new FormControl();
  replayComment = new FormControl();
  likeState:boolean = false;
  likeBtnState = true;
  public post:any;
  constructor(
    private _theme: LyTheme2,
    private postsService:PostsService,
    private router:ActivatedRoute) { }

  ngOnInit(): void {

    let id = this.router.snapshot.params['id'];
    if(this.postsService.getPost().length > 0){

      let cutPost = {...this.postsService.getPost().filter(post=>post.id==id)[0]};
      this.post = {
        id:cutPost.id,
        data:cutPost,
      }

    }
    else{
      this.post = this.postsService.getOnePost(id)
      console.log(this.post);
    }
    this.likeState = this.postsService.getLike(id);


  }

  onLike(){

    if(this.likeState == false){

      this.likeBtnState = false;
      this.likeBtnState = this.postsService.storeLikes(this.post.id);
      this.post.data.likes = this.post.data.likes + 1;

    }else{

      this.likeBtnState = false;
      this.likeBtnState =this.postsService.removeLike(this.post.id);
      this.post.data.likes = this.post.data.likes - 1;

    }
    this.likeState = !this.likeState;
  }

  onComment(){

    let id = this.router.snapshot.params['id'];
    const comment:any= {

      id: this.postsService.makeid(20),
      content: this.comment.value,
      created_at: new Date().toLocaleString(),
      user: '',
      replayOn:'',

    };
    if(this.comment.hasError('required')){
      console.log("required");

    }
    else{

      this.Comment(comment);
      this.comment.reset();
    }
  }
  onCommentR(id:string){
    const comment:any= {

      id: this.postsService.makeid(20),
      content: this.comment.value,
      created_at: new Date().toLocaleString(),
      user: '',
      replayOn:id,

    };

    if(this.replayComment.hasError('required')){
      console.log("required");
    }else{

        this.Comment(comment);
        this.replayComment.reset();
    }

  }

  Comment(comment:any){

    let id = this.router.snapshot.params['id'];
    let newComment:any = this.postsService.createComment(comment,id);

    let Comments:[] = this.post.data.comments.push(newComment);
    this.replayIndex = -1;

  }

  replayOn(id:string):any{
    const comment = this.post.data.comments.find((comment:any)=> comment.id == id);
    if(comment)
      return comment;
    else
      return ''
  }

  replay(id:string){


    console.log(id);

    let comments:any = this.post.data.comments;

    let selected:any  = comments.find((comment:any)=> comment.id == id);

    this.replayIndex =comments.indexOf(selected);

  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/user/auth.service';
import { Post } from '../post.module';
import { PostsService } from '../posts.service';


@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {

  isLoading = false;
  posts:Post[] = [];
  postListenrSub: Subscription=new Subscription();
  searchBox:FormControl = new FormControl();

  constructor(public postsService:PostsService,public authService:AuthService) { }

  ngOnInit(): void {

    this.isLoading = true;
    // this.loadeMore();
    this.postsService.getAllPosts();
    this.postListenrSub = this.postsService.getPostUpdateListener()
    .subscribe((posts) => {
      console.log(posts);
      this.posts = [...posts];

      this.isLoading = false;
    });


  }

  loadeMore() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 20000);
  }

  //this function user to seacrh about posts
  search(){

    this.postsService.getAllPosts()
    
  }

}

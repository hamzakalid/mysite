import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.module';
import {getStorage, ref, uploadBytes} from "@angular/fire/storage"
import { getDownloadURL, uploadString } from 'firebase/storage';
import { Router } from '@angular/router';
import { Comment } from './comment.module';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private  URL = "http://localhost:5001/test-firebase-db-b2391/us-central1/app/api/posts/";
  private Posts: Post[] =new Array();
  updatePost = new Subject<Post[]>();



  // Post lisnter
  getPostUpdateListener() {
    return this.updatePost.asObservable();
  }

  // return Posts
  getPost(){
    return this.Posts;
  }

  constructor(private http:HttpClient,private router:Router) {}

  // this function will return a list of posts
  getAllPosts() {

    this.http.get<{message: string, posts: Post[]}>(`${this.URL}`)
    .subscribe((postData) => {
      console.log(postData.posts);
      this.Posts = [...postData.posts];

      this.updatePost.next([...this.Posts]);
    });

  }

  // this function will return a single post
  getOnePost(id:string):any{

    const post={id:id,data:{}};
    this.http.get<{message: string, post:{id:string,data:{}}}>(`${this.URL}${id}`)
    .subscribe((postData) => {
      post.data = postData.post.data;

    });

    return post;

  }

  // this function will create a new post
  createPost(post:any){
    const filePath = `/postsCovers/Cover-${this.makeid(19)}.jpg`
    const Cover:string= post.cover;
    const storage = getStorage();

    var metadata = {
      contentType: 'image/jpeg',
    };

    const storageRef = ref(storage,filePath);
    const uploadTask = uploadString(storageRef,Cover,'data_url',metadata).then((result)=>{

      getDownloadURL(storageRef).then((url)=>{

        const newPost = {
          title: post.title,
          content: post.content,
          userId: JSON.parse(localStorage.getItem('user')||'{}').uid||'',
          cover: url,
        };

        this.http.post<{message: string, post:{data:{},id: string}}>(`${this.URL}`, newPost)
        .subscribe((responseData) => {

          const postId = responseData.post.id;
          post.id = postId;

          post.cover = url;
          this.Posts.push(post);
          this.updatePost.next([...this.Posts]);

          this.router.navigate(['/post/'+postId]);
        });

      })

    }).catch((error)=>{

      console.log("error some thing went wrong");
      return "";
    });
  }


  // // this function will update a post
  // updatePost(post) {

  // }

  // this function will delete a post
  deletePost(id:string) {
    this.http.delete(this.URL+id).subscribe((res)=>{
      this.Posts = this.Posts.filter(post=> post.id != id)
      this.updatePost.next(this.Posts)
      console.log(res);
    })
  }

  // this function will return a list of comments
  // getAllComments() {

  // }

  // this function will return a single comment
  // getComments(id:string) {
  //   this.http.get<any>(`${this.URL}comments/${id}`)
  // }

  // // this function will create a new comment
  createComment(comment:any,postId:string):any{


    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const newComment:Comment = {
      id: comment.id,
      content: comment.content,
      created_at: comment.created_at,
      replayOn: comment.replayOn,
      user: {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      },
    }

    this.http.post<any>(`${this.URL}${postId}/comment`,newComment)
    .subscribe((result)=>{


    })
    return newComment;
  }

  // // this function will update a comment
  // updateComment(comment) {

  // }

  // // this function will delete a comment
  // deleteComment(id) {

  // }

  // use to send api requser for like any post
  Like(id:string) {
    this.http.get<any>(`${this.URL}like/${id}`)
    .subscribe((postData) => {
      console.log(postData);

      this.Posts.filter(post=> post.id==id).map(post=> post.likes = post.likes+1);
      this.updatePost.next([...this.Posts]);
    });
  }


  // This function use to send api requser for dislike any post
  disLike(id:string) {
    this.http.get<any>(`${this.URL}dislike/${id}`)
    .subscribe((postData) => {
      console.log(postData);

      this.Posts.filter(post=> post.id==id).map(post=> post.likes = post.likes-1);
      this.updatePost.next([...this.Posts]);
    });
  }


  // this function will store the like in local storage
  storeLikes(post:string) {


    if(this.getLike(post) == false){

      let likes = JSON.parse(localStorage.getItem('likes')||'[]');
      this.Like(post);
      likes.push(post);
      localStorage.setItem('likes',JSON.stringify(likes||[]));
    }else{
      console.log("this post is already liked");
    }
    return true;

  }


  //this function will remove the like from the local storage
  removeLike(post:string){

      if(this.getLike(post)== false){
        console.log("this post is not liked");
      }else{
        let oldLikes = JSON.parse(localStorage.getItem('likes')||'[]');
        let likes = oldLikes.filter((like:string) => like!=post);
        localStorage.setItem('likes',JSON.stringify(likes||[]));
        this.disLike(post);
      }
      return true;

  }


  // this function will return on post from the local storage
  getLike(id:string){
    let likes = JSON.parse(localStorage.getItem('likes')||'[]');
    return (likes.find((like:string) => like==id))?true:false;
  }


  //Function to make rundom id
  makeid(length:number):string {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


  // this function to featch all posts user interactive with
  getUserPosts():any{
    const posts = new Array();
    const postAreLike = JSON.parse(localStorage.getItem('likes') || '[]');
    if(this.Posts.length == 0){
      // this.getAllPosts();
    }

    postAreLike.forEach((element:string) => {
      let post = this.Posts.find((post:any) => post.id == element);
      if(post){
        posts.push(post)
      }
    });
    return posts;
  }

}

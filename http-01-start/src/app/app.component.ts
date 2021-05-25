import { PostService } from './post.service';
import { Post } from './post.model';
import { map } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFeatching = false;
  error = '';
  private errorSub = Subscription;

  constructor(private http: HttpClient, private postService: PostService) {}

  private fetchPost(){
    this.isFeatching = true;
    this.postService.fetchPost().subscribe(posts => {
      this.isFeatching = false;
      this.loadedPosts = posts;
    }, error => {
      this.isFeatching = false;
      this.error = error.message;
    });
  }
  ngOnInit() {
    this.errorSub = this.postService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    })
    this.fetchPost();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    // console.log(postData);
    this.postService.createPost(postData.title, postData.content);
    
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPost();
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePost().subscribe(() => {
      this.loadedPosts = [];
    })
  }
  ngOnDestroy(){
    this.errorSub.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  posts?: Post[];
  currentPost: Post = {};
  currentIndex = -1;
  title = '';

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.retrievePosts();
  }

  retrievePosts(): void {
    this.postService.getAll()
      .subscribe({
        next: (data) => {
          this.posts = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrievePosts();
    this.currentPost = {};
    this.currentIndex = -1;
  }

  setActivePost(post: Post, index: number): void {
    this.currentPost = post;
    this.currentIndex = index;
  }

  searchTitle(): void {
    this.currentPost = {};
    this.currentIndex = -1;

    this.postService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.posts = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}

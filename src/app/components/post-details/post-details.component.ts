import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentPost: Post = {
    title: '',
    content: ''
  }

  message = '';

   constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getPost(this.route.snapshot.params["id"]);
    }
  }

  getPost(id: string): void {
    this.postService.get(id)
      .subscribe({
        next: (data) => {
          this.currentPost = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePost(): void {
    this.message = '';

    this.postService.update(this.currentPost.id, this.currentPost)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This post was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deletePost(): void {
    this.postService.delete(this.currentPost.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/posts']);
        },
        error: (e) => console.error(e)
      });
  }
}

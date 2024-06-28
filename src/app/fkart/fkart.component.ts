import { Component } from '@angular/core';
import { Posts } from '../posts';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-fkart',
  templateUrl: './fkart.component.html',
  styleUrl: './fkart.component.css'
})
export class FkartComponent {
  posts: Posts[] | any = [];

  constructor(private postService: PostService){}

  ngOnInit(): void {
    this.posts = this.postService.getAllPosts()
    .subscribe(data => {
      this.posts = data;
    });
  } 
}

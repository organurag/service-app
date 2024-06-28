import { Component } from '@angular/core';
import { Posts } from '../posts';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-azon',
  templateUrl: './azon.component.html',
  styleUrl: './azon.component.css'
})
export class AzonComponent {
  posts: Posts[] | any = [];
  message:string;
  isError: boolean = false;

  constructor(private postService: PostService){}

  ngOnInit(): void {
    this.posts = this.postService.getAllPosts().subscribe(data => 
    {
      this.posts = data;
    },
  (error)=> {
    this.message = error.message;
    this.isError = true;
  });
  } 
}

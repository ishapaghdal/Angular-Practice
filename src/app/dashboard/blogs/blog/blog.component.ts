import { Component, inject, input } from '@angular/core';
import { Blog } from './blog.model';
import { BlogsService } from '../blogs.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { deleteResponse } from '../../../interfaces/Blog';

@Component({
  selector: 'app-blog',
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent {
  http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  blog = input.required<Blog>();
  private blogService = inject(BlogsService);

  private router = inject(Router);

  onDelete(id:number) {
    
    console.log(id);
    
    if (isPlatformBrowser(this.platformId)) {
      let token = localStorage.getItem('token');

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
      // this.blogService.removeBlogs(this.blog().id);
      this.http
        .delete<deleteResponse>(`http://127.0.0.1:8000/blogs/${id}`,{headers:headers})
        .subscribe((response: deleteResponse) => {
          if (response.success) {
            alert('Blog deleted successfully');
          }
        });
    }
  }

  onDetails() {
    this.router.navigate(['/blog', this.blog().id], {
      replaceUrl: true,
    });
  }
}

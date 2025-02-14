import { Component, inject, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BlogsService } from '../blogs/blogs.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-add-blog',
  imports: [ReactiveFormsModule],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css',
})
export class AddBlogComponent {
  platformId = inject(PLATFORM_ID);

  BlogsForm = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    content: new FormControl(''),
    category: new FormControl(''),
    tags_comma: new FormControl<string>(''),
    tags: new FormControl<string[]>([]),
  });
  private obj: any;

  private blogService = inject(BlogsService);
  private router = inject(Router);
  private http = inject(HttpClient);

  onSubmit() {
    let formData = { ...this.BlogsForm.value };

    if (formData.tags) {
      formData.tags = formData.tags_comma?.split(',').map((tag) => tag.trim());
      console.log(formData.tags);
    }

    let token;
    // if (isPlatformBrowser(this.platformId)) {
    token = localStorage.getItem('token');
    // }

    console.log(token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    this.http
      .post('http://127.0.0.1:8000/blogs/', formData, {
        headers: headers,
      })
      .subscribe((response) => {
        this.obj = response;
        console.log(this.obj);
        if (this.obj.success) {
          this.router.navigate(['/dashboard'], {
            replaceUrl: true,
          });
        }
      });
    // this.blogService.addBlog({
    //   author: this.BlogsForm.value.author!,
    //   category: this.BlogsForm.value.category!,
    //   content: this.BlogsForm.value.content!,
    //   title: this.BlogsForm.value.title!,
    // });
  }
}

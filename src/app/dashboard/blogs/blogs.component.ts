import {
  Component,
  computed,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { BlogsService } from './blogs.service';
import { BlogComponent } from './blog/blog.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { url } from 'inspector';

@Component({
  selector: 'app-blogs',
  imports: [BlogComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
})
export class BlogsComponent implements OnInit {
  private http = inject(HttpClient);
  private obj: any;
  platformId = inject(PLATFORM_ID);
  allBlogs = signal([]);
  nextPage = signal<string | null>(null);
  prevPage = signal<string | null>(null);
  api = 'http://127.0.0.1:8000/blogs/';

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchBlogs(this.api);
    }
  }

  fetchBlogs(url: string) {
    let token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    this.http.get(url, { headers: headers }).subscribe((response) => {
      this.obj = response;
      console.log(this.obj);

      this.allBlogs.set(this.obj.results.data);
      this.prevPage.set(this.obj.previous);
      this.nextPage.set(this.obj.next);
    });
    // this.blogsService.loadBlogs();
  }
  goToPage(url: string | null) {
    if (url) {
      this.fetchBlogs(url);
    }
  }
}


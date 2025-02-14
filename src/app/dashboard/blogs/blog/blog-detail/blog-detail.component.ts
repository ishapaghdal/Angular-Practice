import {
  Component,
  computed,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { BlogsService } from '../../blogs.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-blog-detail',
  imports: [],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css',
})
export class BlogDetailComponent implements OnInit {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  obj: any;

  id = signal('');
  @Input() set blogId(id: string) {
    this.id.set(id);
    // console.log(id);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      let token = localStorage.getItem('token');

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
      
      console.log(this.id());
      
      this.http
        .get(`http://127.0.0.1:8000/blogs/${this.id()}`, {headers:headers})
        .subscribe((response) => {
          
          this.obj = response;
          this.obj = this.obj.data;
          console.log(this.obj);
          
        });
    }
  }

  // blogsService = inject(BlogsService);

  // allBlogs = computed(() => this.blogsService.allBlogs());

  // blogDetail = computed(() => {
    // console.log(this.blogsService.allBlogs())
    // return this.blogsService.allBlogs().find((blog) => blog.id === this.id());
  // });
}

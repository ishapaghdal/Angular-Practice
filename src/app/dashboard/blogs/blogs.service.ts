import { Injectable, Inject, PLATFORM_ID, computed } from '@angular/core';
import { signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NewBlogData } from './blog/blog.model';

@Injectable({ providedIn: 'root' })
export class BlogsService {
  private blogs = signal([
    {
      id: '1',
      author: 'u1',
      content: 'content of blog 1',
      title: 'Title 1',
      category: 'Cat1',
    },
    {
      id: '2',
      author: 'u1',
      content: 'content of blog 2',
      title: 'Title 2',
      category: 'Cat2',
    },
    {
      id: '3',
      author: 'u1',
      content: 'content of blog 3',
      title: 'Title 3',
      category: 'Cat3',
    },
  ]);

  allBlogs = this.blogs

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  loadBlogs(): void {
    // Check if we are running in the browser
    if (isPlatformBrowser(this.platformId)) {
      const blogs = localStorage.getItem('blogs');
      console.log(JSON.parse(blogs!));

      if (blogs) {
        const tempBlogs = JSON.parse(blogs);
        
        this.blogs.set(tempBlogs);
        console.log(this.blogs());
      }
    }
  }

  addBlog(blogData: NewBlogData) {
    
    this.blogs.update((prevBlogs) => [
      {
        id: new Date().getTime().toString(),
        author: blogData.author,
        title: blogData.title,
        content: blogData.content,
        category: blogData.category,
      },
      ...prevBlogs,
    ]);
    this.saveBlogs();

  }

  removeBlogs(id: string) {
    this.blogs.update((prevBlogs) =>
      prevBlogs.filter((blog) => blog.id !== id)
    );
    this.saveBlogs();
  }

  saveBlogs() {
    console.log(this.blogs());
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('blogs', JSON.stringify(this.blogs()));
    }
  }

}

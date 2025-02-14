import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogsComponent } from './dashboard/blogs/blogs.component';
import { AddBlogComponent } from './dashboard/add-blog/add-blog.component';
import { AppComponent } from './app.component';
import { BlogComponent } from './dashboard/blogs/blog/blog.component';
import { BlogDetailComponent } from './dashboard/blogs/blog/blog-detail/blog-detail.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'blog/:blogId',
    component: BlogDetailComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: BlogsComponent,
      },
      {
        path: 'add-blog',
        component: AddBlogComponent,
      },
    ],
  },
];

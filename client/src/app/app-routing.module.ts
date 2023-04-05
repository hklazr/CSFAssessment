import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchReviewComponent } from './view0/searchreview/searchreview.component';
import { MovieReviewsListComponent } from './view1/moviereviewslist/moviereviewslist.component';
import { PostCommentComponent } from './view2/postcomment/postcomment.component';

const routes: Routes = [
  { path: "", component: SearchReviewComponent },
  { path: 'list', component: MovieReviewsListComponent},
  { path: 'comment', component: PostCommentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

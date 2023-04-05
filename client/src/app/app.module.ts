import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SearchReviewComponent } from './view0/searchreview/searchreview.component';
import { MovieReviewsListComponent } from './view1/moviereviewslist/moviereviewslist.component';
import { PostCommentComponent } from './view2/postcomment/postcomment.component';
import { MovieService } from './movie.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    SearchReviewComponent,
    MovieReviewsListComponent,
    PostCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

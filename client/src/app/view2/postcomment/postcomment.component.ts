import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/movie.service';

@Component({
  selector: 'app-post-comment',
  templateUrl: './postcomment.component.html',
  styleUrls: ['./postcomment.component.css']
})
export class PostCommentComponent implements OnInit {

  movieTitle: string = '';
  movieId: string = '';
  commentForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private formBuilder: FormBuilder
  ) {
    this.commentForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', Validators.required],
    });
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.movieId = params?.['movieId'];
      this.movieTitle = params?.['movieTitle'];
    });
  }

  onSubmit(): void {

    const payload = {
      movieId: this.movieId,
      movieName: this.movieTitle,
      name: this.commentForm.value.name,
      rating: this.commentForm.value.rating,
      comment: this.commentForm.value.comment,
    };

    this.movieService.postComment(payload).subscribe(() => {
      this.router.navigate(['/movie-reviews'], { queryParams: { query: this.movieTitle } });
    });
  }

  onBackButtonClick(): void {

    this.router.navigate(['/movie-reviews'], { queryParams: { query: this.movieTitle } });
  }
}

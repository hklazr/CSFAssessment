import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from 'src/app/model';
import { MovieService } from 'src/app/movie.service';

@Component({
  selector: 'app-moviereviewslist',
  templateUrl: './moviereviewslist.component.html',
  styleUrls: ['./moviereviewslist.component.css']
})
export class MovieReviewsListComponent implements OnInit {
  reviews: Review[] = [];
  movieName: string | null = '';

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.movieName = params['movieName'];
      if (this.movieName) {
        this.movieService.searchReviews(this.movieName).subscribe(
          (reviews: Review[]) => {
            this.reviews = reviews;
          },
          error => {
            console.error('Error fetching movie reviews', error);
          }
        );
      }
    });
  }

  onCommentButtonClick(review: Review): void {

    this.router.navigate(['/comment'], { queryParams: { movieId: review.id, movieTitle: review.displayTitle } });
  }
  
  onBackButtonClick(): void {

    this.router.navigate(['/search']);
  }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-review',
  templateUrl: './searchreview.component.html',
  styleUrls: ['./searchreview.component.css']
})
export class SearchReviewComponent implements OnInit {
  searchForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.searchForm = this.createForm();
    this.searchForm.get('movieName')?.valueChanges.subscribe(value => {
      const trimmedValue = value.trim();
      if (trimmedValue.length < 2) {
        this.searchForm.get('movieName')?.setErrors({ required: true });
      } else {
        this.searchForm.get('movieName')?.setErrors(null);
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      movieName: ['', Validators.required]
    });
  }

  processForm() {
    const movieName = this.searchForm.get('movieName')?.value.trim();
    this.router.navigate(['/list'], { queryParams: { movieName } });
  }
}

package ibf2022.batch1.csf.assessment.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ibf2022.batch1.csf.assessment.server.models.Comment;
import ibf2022.batch1.csf.assessment.server.models.Review;
import ibf2022.batch1.csf.assessment.server.repositories.MovieRepository;
import ibf2022.batch1.csf.assessment.server.services.MovieService;

@RestController
@RequestMapping(path="/api")
public class MovieController {

	@Autowired
	MovieService movieService;

	@Autowired
	MovieRepository movieRepository;

	// TODO: Task 3, Task 4, Task 8

	// Task 3
	@GetMapping(path="/search", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Review>> searchMovieReviews(@RequestParam("query") String query) {
    
		List<Review> reviews = movieService.searchReviews(query);

    return ResponseEntity.ok(reviews);
}

	//Task 8
    @PostMapping("/comment")
    public ResponseEntity<Void> postComment(@RequestBody Comment comment) {
        movieRepository.insertComment(comment);
        return ResponseEntity.ok().build();	
    }
}

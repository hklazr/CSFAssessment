package ibf2022.batch1.csf.assessment.server.services;

import java.io.StringReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import ibf2022.batch1.csf.assessment.server.models.Review;
import ibf2022.batch1.csf.assessment.server.repositories.MovieRepository;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;;

@Service
public class MovieService {

	// TODO: Task 4
	// DO NOT CHANGE THE METHOD'S SIGNATURE

    @Autowired
    private MovieRepository movieRepository;

    @Value("${nytimes.api.key}")
    private String apiKey;

    public List<Review> searchReviews(String query) {
        List<Review> reviews = fetchReviewsFromNYTimes(query);
        updateReviewsWithCommentCounts(reviews);
        return reviews;
    }

	private List<Review> fetchReviewsFromNYTimes(String query) {
		String url = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query={query}&api-key={apiKey}";
	
		Map<String, String> uriVariables = new HashMap<>();
		uriVariables.put("query", query);
		uriVariables.put("apiKey", apiKey);
	
		RestTemplate restTemplate = new RestTemplate();
		List<Review> reviews = new ArrayList<>();
		try {
			ResponseEntity<String> response = restTemplate.getForEntity(url, String.class, uriVariables);
			if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
				JsonReader jsonReader = Json.createReader(new StringReader(response.getBody()));
				JsonObject jsonObject = jsonReader.readObject();
				JsonArray results = jsonObject.getJsonArray("results");
	
				for (int i = 0; i < results.size(); i++) {
					JsonObject result = results.getJsonObject(i);
					Review review = new Review();
					review.setTitle(result.getString("display_title"));
					review.setRating(result.getString("mpaa_rating"));
					review.setByline(result.getString("byline"));
					review.setHeadline(result.getString("headline"));
					review.setSummary(result.getString("summary_short"));
					review.setReviewURL(result.getJsonObject("link").getString("url"));
	
					JsonObject multimedia = result.getJsonObject("multimedia");
					if (multimedia != null) {
						review.setMultimediaSrc(multimedia.getString("src"));
					}
	
					reviews.add(review);
				}
			}
		} catch (HttpClientErrorException e) {
		}
		return reviews;
	}

	private void updateReviewsWithCommentCounts(List<Review> reviews) {
		for (Review review : reviews) {
			int count = movieRepository.countComments(review.getReviewURL());
			review.setCommentCount(count);
		}
	}
	
}
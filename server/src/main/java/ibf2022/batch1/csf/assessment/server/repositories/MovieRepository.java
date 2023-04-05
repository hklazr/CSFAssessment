package ibf2022.batch1.csf.assessment.server.repositories;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

import ibf2022.batch1.csf.assessment.server.models.Comment;

@Repository
public class MovieRepository {

	@Autowired
	private MongoTemplate mongoTemplate;

	// TODO: Task 5
	// You may modify the parameter but not the return type
	// Write the native mongo database query in the comment below
	//

    /*  
	db.comments.aggregate([
		{ $match: { movieId: <movieId> } },
		{ $group: { _id: "$movieId", count: { $sum: 1 } } }
		])
	*/
    public int countComments(String movieId) {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.match(Criteria.where("movieId").is(movieId)),
                Aggregation.group("movieId").count().as("count")
        );

        AggregationResults<Map> result = mongoTemplate.aggregate(aggregation, "comments", Map.class);
        List<Map> commentCounts = result.getMappedResults();

        if (!commentCounts.isEmpty()) {
            return (int) commentCounts.get(0).get("count");
        } else {
            return 0;
        }
    }

	

	// TODO: Task 8
	// Write a method to insert movie comments comments collection
	// Write the native mongo database query in the comment below
	//

	/*
	 db.comments.insert({ 
		movieId: "...", 
		movieName: "...", 
		name: "...", 
		rating: ..., 
		comment: "..." })
	 */

	 public void insertComment(Comment comment) {
        mongoTemplate.insert(comment, "comments");
    }
}
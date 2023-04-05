package ibf2022.batch1.csf.assessment.server.models;

public class Comment {
    
    private String movieId;
    private String movieName;
    private String name;
    private int rating;
    private String comment;
    
    @Override
    public String toString() {
        return "Comment [movieId=" + movieId + ", movieName=" + movieName + ", name=" + name + ", rating=" + rating
                + ", comment=" + comment + "]";
    }
    public String getMovieId() {
        return movieId;
    }
    public void setMovieId(String movieId) {
        this.movieId = movieId;
    }
    public String getMovieName() {
        return movieName;
    }
    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getRating() {
        return rating;
    }
    public void setRating(int rating) {
        this.rating = rating;
    }
    public String getComment() {
        return comment;
    }
    public void setComment(String comment) {
        this.comment = comment;
    }

    
}

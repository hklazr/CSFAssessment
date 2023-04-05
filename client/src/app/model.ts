export class Review {
    id: string;
    displayTitle: string;
    mpaaRating: string;
    byline: string;
    headline: string;
    summaryShort: string;
    linkUrl: string;
    multimediaSrc: string | null;
    commentCount: number;
  
    constructor(data: any) {
      this.id = data.id || '';
      this.displayTitle = data.display_title || '';
      this.mpaaRating = data.mpaa_rating || '';
      this.byline = data.byline || '';
      this.headline = data.headline || '';
      this.summaryShort = data.summary_short || '';
      this.linkUrl = data.link?.url || '';
      this.multimediaSrc = data.multimedia?.src || null;
      this.commentCount = data.commentCount || 0;
    }
  }
  
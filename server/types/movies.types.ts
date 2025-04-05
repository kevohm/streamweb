export type SortBy =
  | 'popularity.asc'        // Popularity in ascending order
  | 'popularity.desc'       // Popularity in descending order
  | 'release_date.asc'      // Release date in ascending order
  | 'release_date.desc'     // Release date in descending order
  | 'vote_average.asc'      // Vote average in ascending order
  | 'vote_average.desc'     // Vote average in descending order
  | 'vote_count.asc'        // Vote count in ascending order
  | 'vote_count.desc'       // Vote count in descending order
  | 'original_title.asc'    // Original title in ascending order
  | 'original_title.desc'   // Original title in descending order
  | 'title.asc'             // Title in ascending order
  | 'title.desc';           // Title in descending order

export enum SORT_BY {
    POPULARITY_ASC = 'popularity.asc',
    POPULARITY_DESC = 'popularity.desc',
    RELEASE_DATE_ASC = 'release_date.asc',
    RELEASE_DATE_DESC = 'release_date.desc',
    VOTE_AVERAGE_ASC = 'vote_average.asc',
    VOTE_AVERAGE_DESC = 'vote_average.desc',
    VOTE_COUNT_ASC = 'vote_count.asc',
    VOTE_COUNT_DESC = 'vote_count.desc',
    ORIGINAL_TITLE_ASC = 'original_title.asc',
    ORIGINAL_TITLE_DESC = 'original_title.desc',
    TITLE_ASC = 'title.asc',
    TITLE_DESC = 'title.desc',
}
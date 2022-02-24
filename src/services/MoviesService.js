import HttpService from "./HttpService";

class MoviesService extends HttpService {
  getMovies = async (genre = "", search = "", page = 1) => {
    let endpoint = "movies/";
    let query = [];
    if (genre) {
      query.push(`genre=${genre}`);
    }
    if (search) {
      query.push(`search=${search}`);
    }
    if (page) {
      query.push(`page=${page}`);
    }
    let query2 = query.join("&");
    endpoint += `?${query2}`;
    const { data } = await this.client.get(endpoint);
    return data;
  };

  getMovie = async (id) => {
    const { data } = await this.client.get(`movies/${id}`);
    return data;
  };

  createMovie = async (movieData) => {
    const { data } = await this.client.post(`movies/`, movieData);
    return data;
  };

  createLike = async (movie_id, like) => {
    const { data } = await this.client.post(
      `movies/likes/${movie_id}/like-create/`,
      like
    );
    return data;
  };

  createComment = async (movie_id, comment) => {
    const { data } = await this.client.post(
      `movies/comments/${movie_id}/comment-create/`,
      comment
    );
    return data;
  };

  getComments = async (movie_id = "", page = 1) => {
    let endpoint = `movies/comments/${movie_id}/comment-list/?page=${page}`;
    const { data } = await this.client.get(endpoint);
    return data;
  };

  getPopularMovies = async () => {
    const { data } = await this.client.get(`movies/movie-popular-list/`);
    return data;
  };

  getGenreMovies = async (id) => {
    const { data } = await this.client.get(`movies/${id}/movie-genre-list/`);
    return data;
  };
}

const moviesService = new MoviesService();
export default moviesService;

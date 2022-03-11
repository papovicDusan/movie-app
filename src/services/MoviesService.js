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
    const formData = new FormData();
    formData.append("title", movieData.title);
    formData.append("description", movieData.description);
    formData.append("image_url", movieData.image_url);
    formData.append("genre", movieData.genre);

    const { data } = await this.client.post(`movies/`, formData);
    return data;
  };

  createLike = async (movie_id, like) => {
    const { data } = await this.client.post(`movies/${movie_id}/like/`, like);
    return data;
  };

  deleteLike = async (movie_id) => {
    const { data } = await this.client.delete(
      `movies/${movie_id}/delete-like/`
    );
    return data;
  };

  createComment = async (movie_id, comment) => {
    const { data } = await this.client.post(
      `movies/${movie_id}/comments/`,
      comment
    );
    return data;
  };

  getComments = async (movie_id = "", page = 1) => {
    let endpoint = `movies/${movie_id}/comments/?page=${page}`;
    const { data } = await this.client.get(endpoint);
    return data;
  };

  getPopularMovies = async () => {
    const { data } = await this.client.get(`popular-movies/`);
    return data;
  };

  getGenreMovies = async (id) => {
    const { data } = await this.client.get(`movies/${id}/related-movies/`);
    return data;
  };

  addVisit = async (id) => {
    const { data } = await this.client.patch(`movies/${id}/visits/`);
    return data;
  };
}

const moviesService = new MoviesService();
export default moviesService;

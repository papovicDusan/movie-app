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
    console.log(data);
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
}

const moviesService = new MoviesService();
export default moviesService;

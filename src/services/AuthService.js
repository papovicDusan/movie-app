import HttpService from "./HttpService";

class AuthService extends HttpService {
  register = async (userData) => {
    const { data } = await this.client.post("users/", userData);
    // localStorage.setItem("token", data.token);
    return data;
  };

  login = async (credentials) => {
    const { data } = await this.client.post("login/", credentials);
    localStorage.setItem("token", data.access);
    return data;
  };

  logout = async () => {
    await this.client.post("auth/logout");
    // localStorage.removeItem("token");
  };

  getActiveUser = async () => {
    const { data } = await this.client.get("/users/me/");
    return data;
  };
}

export default new AuthService();

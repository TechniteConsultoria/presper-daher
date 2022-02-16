import { ApiService } from "../services/ApiService";

class UserService {
  async createUser(body) {
    try {
      const response = await ApiService.post("/user", body);
      return response;
    } catch (error) {
      return error;
    }
  }

  async authenticateUser(body) {
    try {
      const response = await ApiService.post("auth/authenticate", body);
      return response;
    } catch (error) {
      return error;
    }
  }

  async authenticateGoogleUser() {
    try {
      const response = await ApiService.get("auth/google");
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default new UserService();

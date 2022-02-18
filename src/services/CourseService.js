import { ApiService } from "../services/ApiService";

class CourseService {
  async createCourse(body) {
    try {
      const response = await ApiService.post("/course", body);
      return response;
    } catch (error) {
      return error;
    }
  }

  async getAllCourses() {
    try {
      const response = await ApiService.get("/course");
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new CourseService();

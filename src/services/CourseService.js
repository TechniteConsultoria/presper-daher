import { ApiService } from "../services/ApiService";
import cursoCreate from "./curso/cursoCreate";
import cursoDelete from "./curso/cursoDelete";
import cursoFind from "./curso/cursoFind";
import cursoLoad from "./curso/cursoLoad";
import cursoUpdate from "./curso/cursoUpdate";

class CourseService {
  async createCourse(body) {
    try {
      const response = await cursoCreate(body)
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateCourse(id, body) {
    try {
      const response = cursoUpdate(id, body)
      return response;
    } catch (error) {
      return error;
    }
  }

  async getAllCourses() {
    try {
      const response = await cursoLoad()
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getCourse(id) {
    try {
      const response = await cursoFind(id)
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCourse(id) {
    try {
      const response = await cursoDelete(id)
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new CourseService();

import { ApiService } from "../services/ApiService";

class MessageService {
  async createMessage(body) {
    try {
      const response = await ApiService.post("/message", body);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default new MessageService();

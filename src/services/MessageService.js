import { ApiService } from "../services/ApiService";
import sendEmailPergunta from "./email/sendEmailPergunta";

class MessageService {
  async createMessage(body) {
    try {
      console.log("body")
      console.log(body)
      const response = await sendEmailPergunta(body);
      return response;
    } catch (error) {
      return error;
    }
  }

  async getMessage(query) {
    try {
      const response = await ApiService.get(`/message${query}`);
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateMessageStatus(body) {
    try {
      const response = await ApiService.put(`/message`, body);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default new MessageService();

import { ApiService } from "../services/ApiService";

class CreditCardService {
  async createCreditCard(body) {
    try {
      const response = await ApiService.post("/credit-card", body);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default new CreditCardService();

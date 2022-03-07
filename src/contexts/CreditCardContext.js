import { createContext, useState, useEffect, useContext } from "react";
import CreditCardService from "../services/CreditCardService";

import { useAuth } from "./AuthContext";

export const CreditCardContext = createContext({});

export default function CreditCardProvider({ children }) {
  const { user } = useAuth();
  const [creditCardList, setCreditCardList] = useState([]);

  const getCreditCards = async () => {
    try {
      const userId = user.id;
      const response = await CreditCardService.getAllCreditCards(userId);
      setCreditCardList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addCreditCard = async (data) => {
    try {
      const body = {
        userId: user.id,
        name: data.name,
        number: data.number,
        expiry: data.expiry,
        cvc: data.cvc,
      };

      const response = await CreditCardService.createCreditCard(body);
      console.log(response);

      //TODO - exibir a lista de carões atualizada depois de adiocionar um novo cartão
      //   setCreditCardList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getCreditCards();
  }, []);

  return (
    <CreditCardContext.Provider
      value={{ getCreditCards, creditCardList, addCreditCard }}
    >
      {children}
    </CreditCardContext.Provider>
  );
}

export function useCreditCard() {
  const context = useContext(CreditCardContext);
  const { getCreditCards, creditCardList, addCreditCard } = context;

  return { getCreditCards, creditCardList, addCreditCard };
}

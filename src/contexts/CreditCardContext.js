import { createContext, useState, useEffect, useContext } from "react";
import { id } from "../services/api";
import cartaoLoadFilter from "../services/cartao/cartaoLoadFilter";
import CreditCardService from "../services/CreditCardService";

import { useAuth } from "./AuthContext";

export const CreditCardContext = createContext({});

export default function CreditCardProvider({ children }) {
  const { user } = useAuth();
  const [creditCardList, setCreditCardList] = useState([]);

  const getCreditCards = async () => {
    try {
      let response = await cartaoLoadFilter('user', id)
      setCreditCardList(response);
      return response
    } catch (error) {
      console.log(error);
    }
  };

  const addCreditCard = async (data) => {
    try {
      const body = {
        apelido:     id,
        numero:      data.number,
        nomeTitular: data.name,
        validade:    data.expiry,
        cvv:         data.cvc,
      };

      console.log(body)

      const response = await CreditCardService.createCreditCard(
        {
          apelido:     id,
          numero:      data.number,
          nomeTitular: data.name,
          validade:    data.expiry,
          cvv:         data.cvc,
        }
      );
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

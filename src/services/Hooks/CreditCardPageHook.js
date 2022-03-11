import { useState, useEffect } from "react";
import { CreditCardService } from "../CreditCardService";

// import { useCourse } from "../../contexts/CourseContext/CourseContext";

export const useCreditCardPage = () => {
  //   const [showCvc, setShowCvc] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const [creditCardsList, setCerditCardsList] = useState([]);
  //   const [cardId, setCardId] = useState("");

  const addCreditCard = async () => {
    const body = {
      name: cardName,
      number: cardNumber,
      expiry: cardExpiry,
      cvc: cardCvc,
    };
    try {
      console.log(body);
      //   const response = await CreditCardService.createCreditCard(body);
      //   setResult(response.status);
    } catch (error) {
      console.error(error);
    }

    setCardNumber("");
    setCardName("");
    setCardExpiry("");
    setCardCvc("");
    // setCourse(body);
    // setResultCreateCourseModalShow(true);
    // setVideosErrors([]);
    // getCourses();
  };

  useEffect(() => {}, []);

  return {
    cardName,
    setCardName,
    cardNumber,
    setCardNumber,
    cardExpiry,
    setCardExpiry,
    cardCvc,
    setCardCvc,
    //---------------
    addCreditCard,
  };
};

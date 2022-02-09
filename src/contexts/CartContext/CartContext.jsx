import { createContext, useState, useEffect } from "react";

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(cartFromLocalStorage);

  function addItemToCart(item) {
    let newItem = Object.assign({}, item);
    let found = cart.find(({ id }) => id === item.id);
    if (found === undefined) {
      setCart([...cart, newItem]);
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      console.log("é igual:", found);
    }
  }

  function removeItemFromCart(_id) {
    let formatedList = [];
    cart.map((prod) => {
      if (prod.id !== _id) formatedList.push(prod);
    });
    localStorage.setItem("cart", JSON.stringify(formatedList));
    setCart(formatedList);
  }

  function getTotalAmount() {
    let amount = cart.reduce(
      (accum, item) => accum + parseFloat(item.price),
      0
    );
    return amount;
  }

  function getCart() {
    let cart = localStorage.getItem("cart");
    console.log(cart);
    return cart;
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addItemToCart,
        removeItemFromCart,
        getTotalAmount,
        getCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

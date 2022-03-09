import { createContext, useState, useEffect, useContext } from "react";
import addInCart from "../services/carrinho/addInCart";
import deleteProductOfCart from "../services/carrinho/deleteProductOfCart";
import loadCart from "../services/carrinho/loadCart";

import makeSumToCarrinho from "../utils/makeSumToCarrinho";

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(cartFromLocalStorage);

  async function addItemToCart(prodData) {

    let loadedCart =  await getCart() 
    return await addInCart(prodData, loadedCart, 1 )
  }

  async function removeItemFromCart(prodData) {
    
    await deleteProductOfCart(prodData)
    
    let formatedList = await getCart()
    
    setCart(formatedList);
  }

  async function getTotalAmount() {
    let cart = await getCart();

    return makeSumToCarrinho(cart);
  }

  async function getCart() {
    return await loadCart();
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  const { cart, addItemToCart, removeItemFromCart, getTotalAmount } = context;

  return { cart, addItemToCart, removeItemFromCart, getTotalAmount };
}

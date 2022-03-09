import { createContext, useState, useEffect, useContext } from "react";
import { token } from "../services/api";
import addInCart from "../services/carrinho/addInCart";
import deleteProductOfCart from "../services/carrinho/deleteProductOfCart";
import loadCart from "../services/carrinho/loadCart";

import makeSumToCarrinho from "../utils/makeSumToCarrinho";

// const cartFromLocalStorage = JSON.parse(getTotalAmount);

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {


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
    if(!token) return []
    return await loadCart();
  }

  const [cart, setCart] = useState(getCart);

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
  const { cart, addItemToCart, removeItemFromCart, getTotalAmount, getCart } = context;

  return { cart, addItemToCart, removeItemFromCart, getTotalAmount, getCart };
}

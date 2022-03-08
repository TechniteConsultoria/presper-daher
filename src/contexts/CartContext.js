import { createContext, useState, useEffect, useContext } from "react";
import addInCart from "../services/carrinho/addInCart";
import deleteProductOfCart from "../services/carrinho/deleteProductOfCart";
import loadCart from "../services/carrinho/loadCart";
import makeSumToCarrinho from "../utils/makeSumToCarrinho";

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(cartFromLocalStorage);

  async function addItemToCart(_id) {
    return await addInCart(_id)
  }

  async function removeItemFromCart(_id) {
    
    await deleteProductOfCart(_id)
    
    let formatedList = await getCart()
    
    setCart(formatedList);
  }

  function getTotalAmount() {
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

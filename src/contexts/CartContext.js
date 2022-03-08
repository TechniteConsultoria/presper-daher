<<<<<<< HEAD:src/contexts/CartContext/CartContext.jsx
import { createContext, useState, useEffect } from "react";
import addInCart from "../../services/carrinho/addInCart";
import deleteProductOfCart from "../../services/carrinho/deleteProductOfCart";
import loadCart from "../../services/carrinho/loadCart";
import makeSumToCarrinho from "../../utils/makeSumToCarrinho";
=======
import { createContext, useState, useEffect, useContext } from "react";
>>>>>>> a8adb8d24437613b833efb35c57f7ab9fa8b379d:src/contexts/CartContext.js

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

<<<<<<< HEAD:src/contexts/CartContext/CartContext.jsx
  async function getCart() {
    return await loadCart();
  }

=======
>>>>>>> a8adb8d24437613b833efb35c57f7ab9fa8b379d:src/contexts/CartContext.js
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

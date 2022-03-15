import { createContext, useState, useEffect, useContext } from "react";
import cadastrarCategory from "../services/categoria/cadastrarCategory";
import deleteCategoria  from "../services/categoria/deleteCategory";
import loadCategorias from "../services/categoria/loadCategorias";
import changeCategorias from "../services/categoria/changeCategorias";

export const CategoryContext = createContext({});

export default function CategoryProvider({ children }) {

  async function getCategorys(){
    try {
      

      let categorias = await loadCategorias()
      console.log(categorias)

      setAllCategorys(categorias);

      return categorias
    }
    catch (error) {
      console.log(error);
    }
  };

  const createCategorys = async (data) => {
    try {
      const response = await cadastrarCategory(data);
      
      await getCategorys()
      
      return response;
    }
    catch (error) {
      console.log(error);
    }
  };

  const updateCategory = async (id, data) => {
    try {
      const response = await changeCategorias(data, id);
      
      await getCategorys()
      
      return response;
    }
    catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await deleteCategoria(id);
      
      await getCategorys()

      return response;
    }
    catch (error) {
      console.log(error);
    }
  };

  const [allCategorys, setAllCategorys] = useState(getCategorys);



  // useEffect(() => {
  //   getCategorys();
  // }, []);

  return (
    <CategoryContext.Provider
      value={{
        allCategorys,
        setAllCategorys,
        getCategorys,
        updateCategory,
        deleteCategory,
        createCategorys ,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);
  const { allCategorys, setAllCategorys, getCategorys, createCategorys ,updateCategory, deleteCategory, } = context;

  return {
    allCategorys,
    setAllCategorys,
    getCategorys,
    createCategorys ,
    updateCategory,
    deleteCategory,
  };
}

import { createContext, useState, useEffect, useContext } from "react";
import CourseService from "../services/CourseService";
import cursoCreate from "../services/curso/cursoCreate";
import cursoDelete from "../services/curso/cursoDelete";
import cursoFind from "../services/curso/cursoFind";
import cursoFindWithRelations from "../services/curso/cursoFindWithRelations";
import cursoLoad from "../services/curso/cursoLoad";
import cursoUpdate from "../services/curso/cursoUpdate";

export const CourseContext = createContext({});

export default function CourseProvider({ children }) {

  async function getCourses(){
    try {

      let cursos = await cursoLoad()
      console.log(cursos)

      setAllCourses(cursos);

      return cursos
    }
    catch (error) {
      console.log(error);
    }
  };

  const getCourseById = async (id) => {
    try {
      const response = await cursoFind(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const getCourseByIdWithRelations = async (id) => {
    try {
      const response = await cursoFindWithRelations(id);
      return response;
    }
    catch (error) {
      console.log(error);
    }
  };


  const createCourses = async (data) => {
    try {
      const response = await cursoCreate(data);
      
      await getCourses()
      
      return response;
    }
    catch (error) {
      console.log(error);
    }
  };

  const updateCourse = async (id, data) => {
    try {
      const response = await cursoUpdate(data, id);
      
      await getCourses()
      
      return response;
    }
    catch (error) {
      console.log(error);
    }
  };

  const deleteCourse = async (id) => {
    try {
      const response = await cursoDelete(id);
      
      await getCourses()

      return response;
    }
    catch (error) {
      console.log(error);
    }
  };

  const [allCourses, setAllCourses] = useState(getCourses);



  // useEffect(() => {
  //   getCourses();
  // }, []);

  return (
    <CourseContext.Provider
      value={{
        allCourses,
        setAllCourses,
        getCourses,
        getCourseById,
        getCourseByIdWithRelations,
        updateCourse,
        deleteCourse,
        createCourses ,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const context = useContext(CourseContext);
  const { allCourses, setAllCourses, getCourses, getCourseById, getCourseByIdWithRelations, createCourses ,updateCourse, deleteCourse, } = context;

  return {
    allCourses,
    setAllCourses,
    getCourses,
    getCourseById,
    getCourseByIdWithRelations,
    createCourses ,
    updateCourse,
    deleteCourse,
  };
}

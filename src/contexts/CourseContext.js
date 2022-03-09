import { createContext, useState, useEffect, useContext } from "react";
import CourseService from "../services/CourseService";
import cursoFind from "../services/curso/cursoFind";
import cursoLoad from "../services/curso/cursoLoad";

export const CourseContext = createContext({});

export default function CourseProvider({ children }) {
  const [allCourses, setAllCourses] = useState([]);

  const getCourses = async () => {
    try {

      let cursos = await cursoLoad()
      setAllCourses(cursos);

    } catch (error) {
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

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <CourseContext.Provider
      value={{
        allCourses,
        setAllCourses,
        getCourses,
        getCourseById,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const context = useContext(CourseContext);
  const { allCourses, setAllCourses, getCourses, getCourseById } = context;

  return {
    allCourses,
    setAllCourses,
    getCourses,
    getCourseById,
  };
}

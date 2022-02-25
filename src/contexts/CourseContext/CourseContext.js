import { createContext, useState, useEffect, useContext } from "react";
import CourseService from "../../services/CourseService";

export const CourseContext = createContext({});

export default function CourseProvider({ children }) {
  const [allCourses, setAllCourses] = useState([]);

  const getCourses = async () => {
    try {
      const response = await CourseService.getAllCourses();
      setAllCourses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCourseById = async (id) => {
    try {
      const response = await CourseService.getCourse(id);
      return response.data;
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

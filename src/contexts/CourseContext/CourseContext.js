import { createContext, useState, useEffect, useContext } from "react";
import CourseService from "../../services/CourseService";

export const CourseContext = createContext({});

export default function CourseProvider({ children }) {
  const [allCourses, setAllCourses] = useState([]);

  const getCourses = async () => {
    try {
      const response = await CourseService.getAllCourses();
      setAllCourses(response.data);
      // console.log("From Provider", allCourses);
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
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const context = useContext(CourseContext);
  const { allCourses, setAllCourses, getCourses } = context;

  return {
    allCourses,
    setAllCourses,
    getCourses,
  };
}

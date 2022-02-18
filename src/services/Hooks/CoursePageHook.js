// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CourseService from "../CourseService";

export const useCoursePage = () => {
  const [resultCreateCourseModalShow, setResultCreateCourseModalShow] =
    useState(false);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [videos, setVideos] = useState([]);
  const [videosErrors, setVideosErrors] = useState([]);

  const [videosList, setVideosList] = useState([]);
  const [course, setCourse] = useState({});
  const [created, setCreated] = useState(null);

  const [allCourses, setAllCourses] = useState([]);

  const createCourse = async () => {
    const body = {
      // courseImage: image,
      title: title,
      author: author,
      price: price,
      category: category,
      description: description,
      videos: videosList,
      // videos: videos,
    };
    // const courseImage = image;
    // console.log(courseImage);

    try {
      const response = await CourseService.createCourse(body);
      setCreated(response.status);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setCourse(body);
    setResultCreateCourseModalShow(true);
    setVideosErrors([]);
  };

  const getCourses = async () => {
    try {
      const response = await CourseService.getAllCourses();
      setAllCourses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setResultCreateCourseModalShow(false);
    getCourses();
  }, []);

  return {
    createCourse,
    getCourses,
    allCourses,
    created,
    setCreated,
    setImage,
    setTitle,
    setAuthor,
    setPrice,
    setCategory,
    setDescription,
    setVideos,
    setVideosErrors,
    setVideosList,
    course,
    setCourse,
    resultCreateCourseModalShow,
    setResultCreateCourseModalShow,
  };
};

import { useState, useEffect } from "react";
import CourseService from "../CourseService";

import { useCourse } from "../../contexts/CourseContext";

export const useCoursePage = () => {
  const { getCourses, isUpdated } = useCourse();

  const [resultCreateCourseModalShow, setResultCreateCourseModalShow] =
    useState(false);
  const [resultEditCourseModalShow, setResultEditCourseModalShow] =
    useState(false);
  const [resultDeleteCourseModalShow, setResultDeleteCourseModalShow] =
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

  const [result, setResult] = useState(null);

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

    try {
      const response = await CourseService.createCourse(body);
      setResult(response.status);
    } catch (error) {
      console.error(error);
    }
    setCourse(body);
    setResultCreateCourseModalShow(true);
    setVideosErrors([]);
    getCourses();
  };

  const updateCourse = async (id, data) => {
    const body = data;
    try {
      const response = await CourseService.updateCourse(id, body);
      setResult(response.status);
      isUpdated(true);
    } catch (error) {
      console.error(error);
    }
    setResultEditCourseModalShow(true);
    getCourses();
  };

  const deleteCourse = async (id) => {
    try {
      const response = await CourseService.deleteCourse(id);
      setResult(response.status);
    } catch (error) {
      console.error(error);
    }
    setResultDeleteCourseModalShow(true);
    getCourses();
  };

  useEffect(() => {
    setResultCreateCourseModalShow(false);
    setResultEditCourseModalShow(false);
    setResultDeleteCourseModalShow(false);
    getCourses();
  }, []);

  // useEffect(() => {
  //   getCourses();
  // }, [result]);

  return {
    createCourse,
    updateCourse,
    deleteCourse,
    result,
    setResult,
    image,
    setImage,
    title,
    setTitle,
    author,
    setAuthor,
    price,
    setPrice,
    category,
    setCategory,
    description,
    setDescription,
    videos,
    setVideos,
    videosErrors,
    setVideosErrors,
    videosList,
    setVideosList,
    course,
    setCourse,
    resultCreateCourseModalShow,
    setResultCreateCourseModalShow,
    resultEditCourseModalShow,
    setResultEditCourseModalShow,
    resultDeleteCourseModalShow,
    setResultDeleteCourseModalShow,
  };
};

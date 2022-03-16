import { useState, useEffect } from "react";
import CourseService from "../CourseService";

import { useCourse } from "../../contexts/CourseContext";

export const useCoursePage = () => {

  const { getCourses, isUpdated, createCourses, deleteOneCourse  } = useCourse();

  const [resultCreateCourseModalShow, setResultCreateCourseModalShow] =
    useState(false);
  const [resultEditCourseModalShow, setResultEditCourseModalShow] =
    useState(false);
  const [resultDeleteCourseModalShow, setResultDeleteCourseModalShow] =
    useState(false);

  const [image, setImage] = useState('');
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
    const data = {
      // courseImage: image,
      nome: title,
      autor: author,
      preco: price,
      categoriaId: category,
      descricao: description,
      imagemUrl: image,
      videos: videosList,
      // videos: videos,
    };
    // const courseImage = image;

    console.log(data)

    try {
      // const response = await CourseService.createCourse(body);
      const response = await createCourses(data);
      console.log(response)
      // setResult(response);
    } catch (error) {
      console.error(error);
    }
    setCourse(data);
    setResultCreateCourseModalShow(true);
    setVideosErrors([]);
    getCourses();
  };

  const updateCourse = async (id, data) => {
    const body = data;
    try {
      const response = await CourseService.updateCourse(id, body);
      // setResult(response.status);
      isUpdated(true);
    } catch (error) {
      console.error(error);
    }
    setResultEditCourseModalShow(true);
    getCourses();
  };

  const deleteCourse = async (id) => {
    try {

      console.log("id")
      console.log(id)
      const response = await deleteOneCourse(id);
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

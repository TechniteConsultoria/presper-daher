import { useState, useEffect } from "react";
import { Modal, Button, Form, ListGroup, Alert } from "react-bootstrap";
import { useCoursePage } from "../../services/Hooks/CoursePageHook";
import { BsFillTrashFill } from "react-icons/bs";

import ResultEditCourseModal from "./ResultEditCourseModal";
import DeleteVideoModal from "./DeleteVideoModal";
import DeleteCourseModal from "./DeleteCourseModal";

// TODO - formatar data.videos antes de submeter

function EditCourseModal(props) {
  const [deleteVideoModalShow, setDeleteVideoModalShow] = useState(false);

  const oldVideos = props.course.videos;

  const {
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
    updateCourse,
    resultEditCourseModalShow,
    setResultEditCourseModalShow,
    resultDeleteCourseModalShow,
    setResultDeleteCourseModalShow,
    result,
  } = useCoursePage();

  const [videosList, setVideosList] = useState(props.course.videos);
  const [newVideos, setNewVideos] = useState([]);
  const [videoToDelete, setVideoToDelete] = useState("");
  // const [videosErrors, setVideosErrors] = useState([]);

  useEffect(() => {
    setVideosList(oldVideos);
  }, [oldVideos]);

  function handleSubmit() {
    const id = props.course.id;
    const data = {
      img: image || props.course.img,
      title: title || props.course.title,
      author: author || props.course.author,
      price: price || props.course.price,
      category: category || props.course.category.name,
      description: description || props.course.description,
      // videos: newVideos,
    };
    updateCourse(id, data);

    // setResultEditCourseModalShow(true);
  }

  function handleAddNewVideos(data) {
    let errors = [];
    let files = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].type === "video/mp4") files.push(data[i]);
      else errors.push(data[i]);
    }
    setNewVideos(files);
    setVideosErrors(errors);
  }

  return (
    <>
      <Modal {...props} centered animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Editar curso</Modal.Title>
        </Modal.Header>
        <Form
          action="submit"
          onSubmit={() => {
            handleSubmit();
            props.onHide();
          }}
        >
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label column sm="2">
                Título
              </Form.Label>
              <Form.Control
                type="text"
                defaultValue={props.course.title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label column sm="2">
                Categoria
              </Form.Label>
              <Form.Control
                type="text"
                defaultValue={props.course.category?.name}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label column sm="2">
                Autor
              </Form.Label>
              <Form.Control
                type="text"
                defaultValue={props.course.author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label column sm="2">
                Preço
              </Form.Label>
              <Form.Control
                type="float"
                min={0.0}
                defaultValue={props.course.price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label column sm="2">
                Descrição
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                defaultValue={props.course.description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                Imagem
              </Form.Label>
              <Form.Control readOnly defaultValue={props.course.img} required />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label column>Selecionar nova imagem</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.file)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox" className="mb-3">
              <Form.Label column sm="2">
                Videos
              </Form.Label>
              <Form.Label>Selecionar vídeos a serem removidos</Form.Label>

              <ListGroup as="ol" variant="flush">
                {videosList?.map((video, id) => {
                  return (
                    <ListGroup.Item
                      key={id}
                      as="li"
                      style={{
                        justifyContent: "space-between",
                        display: "flex",
                        fontSize: "14px",
                        // alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <span>
                        {" "}
                        {"  "}
                        {video}
                      </span>
                      <span>
                        <BsFillTrashFill
                          color="rgb(220, 53, 69)"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            props.onHide();
                            setVideoToDelete(video);
                            setDeleteVideoModalShow(true);
                          }}
                        />
                      </span>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Form.Group>

            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label column sm="4">
                Adicionar vídeo
              </Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => {
                  console.log(e.target.files);
                  // setNewVideos(e.target.files);
                  handleAddNewVideos(e.target.files);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Vídeos selecionados:</Form.Label>

              {newVideos?.length > 0
                ? newVideos.map((video, id) => {
                    return (
                      <Form.Check
                        type="checkbox"
                        label={video.name}
                        key={id}
                        checked
                        onChange={() => console.log(video.name)}
                      />
                    );
                  })
                : ""}
            </Form.Group>
            {videosErrors?.length ? (
              <Alert variant="danger">
                Os seguintes arquivos não puderam ser carregados pois não
                possuem a extensão <strong>mp4</strong>
                <br />
                <br />
                <ul>
                  {videosErrors.map((val, id) => {
                    return <li key={id}>{val.name}</li>;
                  })}
                </ul>
              </Alert>
            ) : (
              ""
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button
              type="submit"
              style={{
                backgroundColor: "#fff",
                border: "1px solid rgb(108, 117, 125, 0.3)",
                color: "#000",
              }}
              onClick={() => {
                setResultDeleteCourseModalShow(true);
                props.onHide();
              }}
            >
              Remover curso
            </Button>

            <Button
              style={{
                border: "none",
                boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
              }}
              variant="danger"
              onClick={() => {
                props.onHide();
                setVideosErrors([]);
                setNewVideos();
              }}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              style={{
                backgroundColor: "#14B8A6",
                border: "none",
                boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
              }}
            >
              Editar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <ResultEditCourseModal
        show={resultEditCourseModalShow}
        onHide={() => setResultEditCourseModalShow(false)}
        course={props.course}
        result={result}
      />

      <DeleteCourseModal
        show={resultDeleteCourseModalShow}
        onHide={() => setResultDeleteCourseModalShow(false)}
        course={props.course}
      />

      <DeleteVideoModal
        show={deleteVideoModalShow}
        onHide={() => setDeleteVideoModalShow(false)}
        video={videoToDelete}
        // course={props.course}
        // result={"not-okay"}
      />
    </>
  );
}

export default EditCourseModal;

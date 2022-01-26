import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Alert } from "react-bootstrap";
import ResultCreateCourseModal from "./ResultCreateCourseModal";

function CreateCourseModal(props) {
  const [resultCreateCourseModalShow, setResultCreateCourseModalShow] =
    useState(false);

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [videos, setVideos] = useState([]);
  const [videosErrors, setVideosErrors] = useState([]);

  const [videosList, setVideosList] = useState([]);

  const [course, setCourse] = useState({});

  useEffect(() => {}, []);

  function handleSubmit() {
    const data = {
      img: image,
      title: title,
      author: author,
      price: price,
      category: category,
      description: description,
      videos: videosList,
    };
    setCourse(data);
    setResultCreateCourseModalShow(true);
    setVideosErrors([]);
  }

  function handleAddVideos(data) {
    let errors = [];
    let files = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].type === "video/mp4") files.push(data[i]);
      else errors.push(data[i]);
    }
    setVideosList(files);
    setVideosErrors(errors);
  }

  return (
    <>
      <Modal {...props} centered animation={false}>
        <Modal.Header
          closeButton
          onClick={() => {
            setVideosErrors();
            setVideosList();
          }}
        >
          <Modal.Title>Adicionar curso</Modal.Title>
        </Modal.Header>
        <Form
          action="submit"
          onSubmit={() => {
            handleSubmit();
            props.onHide();
            setVideosList();
          }}
        >
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label column sm="2">
                Título
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Título"
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
                placeholder="Categoria"
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
                placeholder="Autor"
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
                placeholder="R$ 99.99"
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
                placeholder="Descrição"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2">
                Imagem
              </Form.Label>
              {/* <Col sm="10">
                <Form.Control plaintext readOnly />
              </Col> */}
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control
                  type="file"
                  required
                  onChange={(e) => setImage(e.target.file)}
                />
              </Form.Group>
            </Form.Group>

            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label column sm="4">
                Adicionar vídeo
              </Form.Label>
              <Form.Control
                type="file"
                multiple
                required
                onChange={(e) => {
                  handleAddVideos(e.target.files);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Vídeos selecionados:</Form.Label>

              {videosList?.length > 0
                ? videosList.map((video, id) => {
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
              style={{
                border: "none",
                boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
              }}
              variant="danger"
              onClick={() => {
                props.onHide();
                setVideosErrors([]);
                setVideosList();
              }}
            >
              Cancelar
            </Button>

            <Button
              style={{
                backgroundColor: "#14B8A6",
                border: "none",
                boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
              }}
              type="submit"
            >
              Adicionar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <ResultCreateCourseModal
        show={resultCreateCourseModalShow}
        onHide={() => setResultCreateCourseModalShow(false)}
        course={course}
        result={"okay"}
      />
    </>
  );
}

export default CreateCourseModal;

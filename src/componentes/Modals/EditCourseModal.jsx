import { useState, useEffect } from "react";
import { Modal, Button, Form, ListGroup, Alert } from "react-bootstrap";

import ResultEditCourseModal from "./ResultEditCourseModal";
import DeleteVideoModal from "./DeleteVideoModal";

import { BsFillTrashFill } from "react-icons/bs";
import { formatPrice } from "../../utils/format";
import IntlCurrencyInput from "react-intl-currency-input"

import currencyConfig from "../../utils/currenryConfig";
import cursoUpdate from "../../services/curso/cursoUpdate";
import loadCategorias from "../../services/categoria/loadCategorias";
import uploadImage from "../../services/imagem/upload";

// TODO - formatar data.videos antes de submeter

function EditCourseModal(props) {
  const [resultEditCourseModalShow, setResultEditCourseModalShow] =
    useState(false);

  const [deleteVideoModalShow, setDeleteVideoModalShow] = useState(false);

  const oldVideos = props.course.videos;

  const [image, setImage] = useState(props.course.imagemUrl);
  const [title, setTitle] = useState(props.course.nome);
  const [author, setAuthor] = useState(props.course.autor);
  const [price, setPrice] = useState(props.course.preco);
  const [category, setCategory] = useState(props.course.categoria);
  const [description, setDescription] = useState(props.course.descricao);
  const [handleChangePrice,       setHandleChangePrice] = useState(formatPrice(props.course.preco));


  const [videosList, setVideosList] = useState(props.course.videos);

  const [newVideos, setNewVideos] = useState([]);
  const [newVideo,  setNewVideo] = useState();
  const [videoToDelete, setVideoToDelete] = useState("");
  const [videosErrors, setVideosErrors] = useState([]);
  const [categorias,              setCategorias  ]      = useState([]);


  useEffect(() => {
    setVideosList(oldVideos);
  }, [oldVideos]);

  function handleSubmit() {

    const data = {
      id: props.course.id,
      imagemUrl: image || props.course.imagemUrl,
      nome: title || props.course.nome,
      autor: author || props.course.autor,
      preco: price || props.course.preco,
      categoriaId: category || props.course.categoriaId,
      descricao: description || props.course.descricao,
      videos: newVideos,
    };
    console.log(data)

    cursoUpdate(data, props.course.id)

    setResultEditCourseModalShow(true);
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

  const handleChangePriceOfProduct = (event, value, maskedValue) => {
    event.preventDefault();

    setPrice(value);                   // value without mask (ex: 1234.56)
    setHandleChangePrice(maskedValue); // masked value (ex: R$1234,56)
  };

  async function getCategories(){
    try {
      await loadCategorias(setCategorias);
    }
    
    catch (error) {
      console.log(error);
    }
  }

  useEffect(
    () => {

      getCategories()
    },[]
  )

  console.log(formatPrice(props.course.preco))

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
                defaultValue={props.course.nome}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label column sm="2">
                Categoria
              </Form.Label>
              <Form.Control
                as="select"
                defaultValue={props.course.categoriaId}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                {
                  categorias.map(
                    (category) => (
                      <option key={category.id} value={category.id}>
                        {category.nome}
                      </option>
                    )
                  )
                }

              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label column sm="2">
                Autor
              </Form.Label>
              <Form.Control
                type="text"
                defaultValue={props.course.autor}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label column sm="2">
                Preço
              </Form.Label>
              {/* <Form.Control
                type="float"
                min={0.0}
                defaultValue={props.course.preco}
                onChange={(e) => setPrice(e.target.value)}
                required
              /> */}
               <IntlCurrencyInput 
                  className="currencyInput"
                  currency="BRL" 
                  config={currencyConfig}
                  value={handleChangePrice}
                  onChange={handleChangePriceOfProduct} 
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
                defaultValue={props.course.descricao}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                Imagem
              </Form.Label>
              <Form.Control readOnly defaultValue={props.course.imagemUrl} required />
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
                onChange={async (e) => {
                  let video = e.target.file
                  console.log(video)
                  console.log(e.target.files);
                  await uploadImage(e.target.files, setNewVideo)
                  handleAddNewVideos(newVideo);
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
              onClick={props.onHide}
            >
              Ocultar curso
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
        result={"okay"}
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

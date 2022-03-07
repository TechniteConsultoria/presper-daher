import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Alert } from "react-bootstrap";
import ResultCreateCourseModal from "./ResultCreateCourseModal";
import { toast } from "react-toastify"
import uploadImage from "../../services/imagem/upload";

import IntlCurrencyInput from "react-intl-currency-input"

import '../../index.css'

import currencyConfig from "../../utils/currenryConfig";

const axios = require("axios").default;

function CreateCourseModal(props) {
  const [resultCreateCourseModalShow, setResultCreateCourseModalShow] =
    useState(false);

  const [image,                   setImage       ]      = useState("");
  const [title,                   setTitle       ]      = useState("");
  const [author,                  setAuthor      ]      = useState("");
  const [price,                   setPrice       ]      = useState("");
  const [category,                setCategory    ]      = useState("");
  const [description,             setDescription ]      = useState("");
  const [videosErrors,            setVideosErrors]      = useState([]);
  const [videos,                  setVideos      ]      = useState([]);
  const [handleChangePrice,       setHandleChangePrice] = useState();

  const [videosList, setVideosList] = useState([]);

  const [course, setCourse] = useState({});

  useEffect(() => { }, []);

  async function handleSubmit() {
    const data = {
      imagemUrl:   image,
      nome:        title,
      autor:       author,
      preco:       price,
      categoriaId: category,
      descricao:   description,
      videos:      videosList,
      // videos: videos,
    };

    try {
      const url = "https://fake-api-json-server-presper.herokuapp.com/cursos";
      axios.post(url, data).then((res) => {
        console.log(res);
      });
    }
    catch (error) {
      console.error(error);
    }
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

    //* Apenas para development
    // let videos = [];
    // files.map((el) => {
    //   let t = String(el.name);
    //   return videos.push(t);
    // });
    // setVideosList(videos);
    //* Apenas para development

    setVideosList(files);
    setVideosErrors(errors);
  }

  async function handleUploadImage(image){
    if (image.type.includes('image')) {
      
      uploadImage(image, setImage)

    }
    else {
      toast.error('Arquivo inválido!')
    }
  }

  const handleChangePriceOfProduct = (event, value, maskedValue) => {
    event.preventDefault();

    setPrice(value);                   // value without mask (ex: 1234.56)
    setHandleChangePrice(maskedValue); // masked value (ex: R$1234,56)
  };

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
              
              <IntlCurrencyInput 
                  className="currencyInput"
                  currency="BRL" 
                  config={currencyConfig}
                  onChange={handleChangePriceOfProduct} 
                  value={handleChangePrice}
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
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control
                  type="file"
                  required
                  onChange={(e) => {
                    handleUploadImage(e.target.files[0])
                  }}
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

import { createContext, useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Row, ListGroup, Alert } from "react-bootstrap";
import { useCoursePage } from "../../services/Hooks/CoursePageHook";
import ResultCreateCourseModal from "./ResultCreateCourseModal";
import { toast } from "react-toastify"
import uploadImage from "../../services/imagem/upload";

import IntlCurrencyInput from "react-intl-currency-input"

import '../../index.css'

import currencyConfig from "../../utils/currenryConfig";

import loadCategorias from "../../services/categoria/loadCategorias";
import LoadingGif from "../../componentes/LoadingGif";

import { BsFillAwardFill, BsFillCameraVideoFill, BsFillPlusSquareFill, BsFillTrashFill } from "react-icons/bs"; 

import ShowVideoModal from './ShowVideoModal'
import CreateCategoryModal from "./CreateCategoryModal";

function CreateCourseModal(props) {
  const [handleChangePrice,       setHandleChangePrice] = useState();
  const [categorias,              setCategorias       ] = useState([]);
  const [newVideo,                setNewVideo         ] = useState();
  const [showCreateCategoryModal, isShowCreateCategoryModal] = useState(false);

  
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [videoModalUrl, setVideoModalUrl] = useState('')
  const [loading, setLoading] = useState(false);
  

  useEffect(() => { }, []);
  
  const {
    createCourse,
    result,
    setResult,
    setImage,
    image,
    setTitle,
    title,
    setAuthor,
    author,
    setPrice,
    price,
    setCategory,
    category,
    setDescription,
    description,
    setVideos,
    setVideosErrors,
    videosList,
    setVideosList,
    course,
    setCourse,
    resultCreateCourseModalShow,
    setResultCreateCourseModalShow,
  } = useCoursePage();


  function handleAddVideos(pathToVideo, imageName) {
    let data = {
      url:   pathToVideo,
      ordem: videosList.length,
      nome:  imageName,
    }
    console.log(data)
    console.log(data.ordem)

    setVideosList((prevData) => {
      return [...new Set( [ ...prevData, data  ] )]	
     } );
  }

  async function handleUploadImage(image){
    if (image.type.includes('image')) {
      
      uploadImage(image, setImage)

    }
    else {
      toast.error('Arquivo inválido!')
    }
  }

  async function handleUploadVideo(image){
    if (image.type.includes('mp4')) {

      console.log("image")
      console.log(image.name)
      let videoPath = await uploadImage(image, setNewVideo)

      handleAddVideos(videoPath, image.name);

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

  async function getCategories(){
    try {
      let categories = await loadCategorias()

      console.log("categories")
      console.log(categories)

      setCategorias(categories)
      setCategory(categories[0].id)
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
  
  function clearImage(){
    setImage('')

  }


  function handleShowVideo(url) {
    setVideoModalUrl(url)
    setShowVideoModal(true)
  }

  return (
    <>
      <Modal
      {...props}
      onHide={() => {
        clearImage()
        props.onHide()
      }}
      centered
      animation={false}
      >
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
          encType="nultipart/form-data"
          action="submit"
          onSubmit={
            async (e) => {
            e.preventDefault()
            if(await createCourse() == 'ok'){
              props.onHide()
            }
          }
        }
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
              <div
              style={
                {
                  display: 'flex',
                  justifyContent: 'center',
                }
              }
              >
                <Form.Control
                  as="select"
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  value={category}
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
                <BsFillPlusSquareFill
                  onClick={() => isShowCreateCategoryModal(true)}
                  size="2.45em"
                  style={
                    { color: "rgb(20, 184, 166)",
                    marginLeft: '5px',
                    cursor: 'pointer' }
                    } />
                {" "}
              </div>
              
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
                  name="courseImage"
                  type="file"
                  required
                  onChange={(e) => {
                    handleUploadImage(e.target.files[0])
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                  <img
                  style={{
                    borderRadius: '5px'
                  }}
                  src={ image || 'https://www.corsan.com.br/themes/padrao2019/images/outros/GD_imgSemImagem.png' }
                  alt="" srcset="" />
              </Form.Group>
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label column sm="4">
                Adicionar vídeo
              </Form.Label>
              { loading ? (
                <LoadingGif/>
                ):(
                <Form.Control
                  type="file"
                  multiple
                  onChange={async (e) => {
                    let video = e.target.files[0]

                    setLoading(true)

                    await handleUploadVideo(video)

                    setLoading(false)
                  }}
                />
              )
              }
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Vídeos selecionados:</Form.Label>

              {videosList?.length > 0
                ? videosList.map((video, index) => {
                  return (
                  <ListGroup.Item
                      key={index}
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
                         <div
                             style={{
                               display: 'inline'
                             }}
                             onClick={ () => handleShowVideo(video.url)}
                           >
                             <BsFillCameraVideoFill />
                           </div>
                       </span>
                      <span>
                        {video.nome || video.url }
                      </span>
                      <span>
                        <BsFillTrashFill
                          color="rgb(220, 53, 69)"
                          style={{ cursor: "pointer" }}
                          onClick={() => {

                            let updatedVideos = [...videosList]
                            updatedVideos.splice(index, 1);
                            setVideosList(updatedVideos)

                          }}
                        />
                      </span>
                    </ListGroup.Item>
                  );
                })
                : 
                ( <p> Nenhum vídeo adicionado </p> ) 
              }
            </Form.Group>

            {/* {videosErrors?.length ? (
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
            )} */}
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
                // setVideosList();
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
      {/* <ResultCreateCourseModal
        show={resultCreateCourseModalShow}
        onHide={() => setResultCreateCourseModalShow(false)}
        course={course}
        result={result}
      /> */}
      <ShowVideoModal
        onHide={() => setShowVideoModal(false)}
        show={showVideoModal}
        url={ videoModalUrl }
      />

    <CreateCategoryModal
        show={showCreateCategoryModal}
        onHide={() => {
          isShowCreateCategoryModal(false)
          // getCategories()

          setTimeout(() => {
            getCategories()
          }, 1000);
        }}
      />
    </>
  );
}

export default CreateCourseModal;

import { useState, useEffect } from "react";

import {
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  Form,
  FormControl,
} from "react-bootstrap";

import { useCourse } from "../../contexts/CourseContext";

import CardComponent from "../Card/Card";
import EditCourseModal from "../Modals/EditCourseModal";
import CreateCourseModal from "../Modals/CreateCourseModal";

// import cursos from "../../data/cursos";
// import categorias from "../../data/categorias";

import "./AdminCourses.style.css";
import cursoLoad from "../../services/curso/cursoLoad";
import loadCategorias from "../../services/categoria/loadCategorias";

function Courses() {
  const { allCourses } = useCourse();

  const [classificar, setClassificar] = useState("Mais vendidos");
  const [filtro, setFiltro] = useState("Sem filtro");
  const [buscarCurso, setBuscarCurso] = useState("");
  const [editCourseModal, showEditCourseModal] = useState(false);
  const [createCourseModal, showCreateCourseModal] = useState(false);
  const [course, setCourse] = useState({});

  const [categorias, setCategorias] = useState([]);

  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    classificarPor(classificar);
    filtrarPor(filtro);
  }, [classificar, filtro]);

  useEffect(() => {
    buscarPor(buscarCurso);
  }, [buscarCurso]);

  useEffect(() => {
    getCourses();
    getCategories()
  }, []);
  

  function classificarPor(classificar) {
    switch (classificar) {
      case "Menos vendidos":
        setCourseList(
          courseList.sort((a, b) => {
            return a.sold - b.sold;
          })
        );
        break;
      case "Maior preço":
        setCourseList(
          courseList.sort((a, b) => {
            return a.price + b.price;
          })
        );
        break;
      case "Menor preço":
        setCourseList(
          courseList.sort((a, b) => {
            return a.price - b.price;
          })
        );
        break;
      default:
        setCourseList(
          courseList.sort((a, b) => {
            return a.sold + b.sold;
          })
        );
        break;
    }
  }

  function filtrarPor(filtro) {
  // alterar para funções com requisição do backend
    if (filtro !== "Sem filtro")
      setCourseList(courseList.filter((c) => c.category === filtro));
    else setCourseList(courseList);
  }

  function buscarPor(buscarCurso) {
    setCourseList(
      // eslint-disable-next-line array-callback-return
      courseList.filter((val) => {
        if (!buscarCurso.length) {
          setFiltro(filtro);
          return val;
        } else if (
          filtro === "Sem filtro" &&
          val.nome.toLowerCase().includes(buscarCurso.toLowerCase())
        ) {
          return val;
        } else if (
          val.category === filtro &&
          val.nome.toLowerCase().includes(buscarCurso.toLowerCase())
        ) {
          return val;
        }
      })
    );
  }

  async function getCourses() {
    try {
      let courses = await cursoLoad();
      setCourseList(courses);
    }

    catch (error) {
      console.log(error);
    }
  }

  async function getCategories(){
    try {
      let categorias = await loadCategorias(setCategorias);
      // setCategorias(categorias);
    }
    
    catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <Container fluid className="container-admin">
        <div className="container-item">
          <Row className="row-novo-curso">
            <Col>
              <h2>Cursos</h2>
              <p>Cadastre um novo curso</p>
            </Col>
            <Col>
              <Button
                style={{
                  backgroundColor: "#14B8A6",
                  border: "none",
                  boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
                }}
                onClick={() => {
                  showCreateCourseModal(true);
                }}
              >
                NOVO CURSO
              </Button>
            </Col>
          </Row>
        </div>
        <hr></hr>
        <div className="container-item" id="cursos-cadastrados">
          <Row className="row-filtro">
            <Col>
              <Row>
                <h2>Cursos Cadastrados</h2>
                <p>Visualize e edite seus cursos cadastrados</p>
              </Row>
            </Col>
          </Row>
        </div>
        <br />

        <Container className="container-filtro">
          <div className="filtro-item">
            <Form.Label column sm="6">
              Pesquisar
            </Form.Label>
            <Form className="search-bar">
              <FormControl
                size="sm"
                type="search"
                placeholder="Pesquisar cursos"
                className="me-2"
                aria-label="Search"
                onChange={(e) => {
                  setBuscarCurso(e.target.value);
                }}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              />
            </Form>
          </div>
          <div className="filtro-item">
            <Form.Label column sm="8">
              Classificar por
            </Form.Label>
            <Dropdown>
              <Dropdown.Toggle
                size="sm"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid rgb(108, 117, 125, 0.3)",
                  color: "#000",
                  width: "200px",
                }}
              >
                {classificar}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setClassificar("Mais vendidos")}>
                  Mais vendidos
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setClassificar("Menos vendidos")}>
                  Menos vendidos
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setClassificar("Maior preço")}>
                  Maior preço
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setClassificar("Menor preço")}>
                  Menor preço
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="filtro-item">
            <Form.Label column sm="10">
              Filtrar por categoria
            </Form.Label>
            <Dropdown>
              <Dropdown.Toggle
                size="sm"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid rgb(108, 117, 125, 0.3)",
                  color: "#000",
                  width: "200px",
                }}
              >
                {filtro}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setFiltro("Sem filtro")}>
                  Sem filtro
                </Dropdown.Item>
                {categorias?.map((item, id) => {
                  return (
                    <Dropdown.Item
                      onClick={() => setFiltro(item.nome)}
                      key={id}
                    >
                      {item.nome}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>

        <div className="container-item" id="cursos-list">
          <div className="courses-container">
            {/* {courseList?.map((item) => (
              <CardComponent
                key={item.id}
                img={item.img}
                title={item.title}
                author={item.author}
                rating={item.rating}
                price={item.price}
                sold={item.sold}
                onClick={() => {
                  setCourse(item);
                  showEditCourseModal(true);
                }}
              />
            ))} */}

            {allCourses?.map((item) => (
              <CardComponent
                key={item.id}
                img={item.imagemUrl}
                title={item.nome}
                author={item.autor}
                rating={item.rating}
                price={item.preco}
                sold={item.sold}
                onClick={() => {
                  setCourse(item);
                  console.log(item)
                  showEditCourseModal(true);
                }}
              />
            ))}
          </div>
        </div>
      </Container>

      <EditCourseModal
        show={editCourseModal}
        onHide={() => showEditCourseModal(false)}
        course={course}
      />

      <CreateCourseModal
        show={createCourseModal}
        onHide={() => showCreateCourseModal(false)}
      />
    </>
  );
}

export default Courses;

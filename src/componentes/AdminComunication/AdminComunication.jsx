import { useState, useEffect } from "react";
import Pagination from "react-js-pagination";

import {
  Container,
  Row,
  Col,
  Table,
  Dropdown,
  Form,
  Badge,
} from "react-bootstrap";

import { BsFillEyeFill, BsTrashFill, BsFillEyeSlashFill } from "react-icons/bs";

import "./AdminComunication..style.css";
import mensagens from "../../data/mensagens";
import cursos from "../../data/cursos";
import loadPergunta from "../../services/pergunta/perguntaLoad";

import deleteDepoimento from "../../services/comentario/depoimentoDelete.js";
import updateDepoimento from "../../services/comentario/depoimentoUpdate.js";
import loadCategorias from "../../services/categoria/loadCategorias.js";

//*
//TODO - 1. arrrumar os filtros
//* DONE - 2. fazer a integração consumindo os dados do back
//*

function Comunication() {
  // const [messageId, setMessageId] = useState("");
  // const [messageStatus, setMessageStatus] = useState("");
  // const courses = cursos;
  // const [buscarCurso, setBuscarCurso] = useState("");
  // const [createCourseModal, showCreateCourseModal] = useState(false);
  // const [course, setCourse] = useState({});
  // const [courseList, setCourseList] = useState([]);
  // const [messagesList, setMessagesList] = useState([]);

  //   useEffect(() => {
  //     classificarPorData(classificar);
  //     filtrarPor(filtroStatus);
  //     console.log(classificar);
  //   }, [classificar, filtroStatus]);

  //   useEffect(() => {
  //     buscarPor(buscarCurso);
  //   }, [buscarCurso]);

  const [messagesList, setMessagesList] = useState([]);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [classificar, setClassificar] = useState("Sem classificação");
  const [filtroStatus, setFiltroStatus] = useState("Sem filtro");
  const [filtroCurso, setFiltroCurso] = useState("Sem filtro");

  useEffect(() => {
    classificarPorData(classificar);
    filtrarPorStatus(filtroStatus);

    // handleFiltro();
  }, [classificar, filtroStatus]);

  useEffect(() => {
    filtrarPorCurso(filtroCurso);

    // handleFiltro();
  }, [filtroCurso]);

  //TODO - FILTROS - não está funcionando
  function classificarPorData(classificar) {
    switch (classificar) {
      case "Mais antigas":
        setMessagesList(
          mensagens.sort((a, b) => new Date(a.date) < new Date(b.date))
        );
        break;
      case "Mais recentes":
        setMessagesList(
          mensagens.sort((a, b) => {
            return new Date(a.date) > new Date(b.date);
          })
        );
        break;
      default:
        setMessagesList(
          mensagens.sort((a, b) => {
            return new Date(a.date) > new Date(b.date);
          })
        );
        break;
    }
  }

  function filtrarPorStatus(filtroStatus) {
    if (filtroStatus !== "Sem filtro")
      setMessagesList(mensagens.filter((c) => c.status === filtroStatus));
    else setMessagesList(mensagens);
  }

  function filtrarPorCurso(filtroCurso) {
    if (filtroCurso !== "Sem filtro") {
      setMessagesList(mensagens.filter((c) => c.course === filtroCurso));
    } else setMessagesList(mensagens);
  }

  // async function getMessages(page) {
  //   const query = `?page=${page}`;
  //   let response;
  //   try {
  //     response = await MessageService.getMessage(query);
  //     console.log(response);
  //     setPage(Number(response.data.page));
  //     setCurrentPage(Number(response.data.page));
  //     setTotalItems(Number(response.data.total));
  //     setLastPage(Number(response.data.last_page));
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   const msgs = response.data.data.map((m) => {
  //     const courseName = allCourses.find((c) => c.id === m.courseId);
  //     let newObject = { ...m };
  //     newObject.courseName = courseName || null;
  //     return newObject;
  //   });
  //   setMessagesList(msgs);
  // }

  // async function updateMsgList() {
  //   const query = `?page=${page}`;
  //   try {
  //     const response = await MessageService.getMessage(query);
  //     const updatedList = response.data.data;

  //     setPage(Number(response.data.page));
  //     setCurrentPage(Number(response.data.page));
  //     setTotalItems(Number(response.data.total));
  //     setLastPage(Number(response.data.last_page));

  //     setMessagesList(updatedList);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // * in progress
  const mock = [
    {
      id: 1,
      courseName: "Curso 1",
      userName: "Usuário 1",
      createdAt: "2022-03-01 18:53:24.015268",
      visible: true,
    },
    {
      id: 2,
      courseName: "Curso 2",
      userName: "Usuário 2",
      createdAt: "2022-03-02 18:41:34.795849",
      visible: false,
    },
    {
      id: 3,
      courseName: "Curso 3",
      userName: "Usuário 3",
      createdAt: "2022-02-03 18:40:43.438754",
      visible: true,
    },
    {
      id: 4,
      courseName: "Curso 4",
      userName: "Usuário 4",
      createdAt: "2022-02-04 18:37:17.720362",
      visible: false,
    },
    {
      id: 5,
      courseName: "Curso 5",
      userName: "Usuário 5",
      createdAt: "2022-02-05 18:24:00.154439",
      visible: true,
    },
  ];

  const [allTestimonials, setAllTestimonials] = useState([]);
  const [testimonialsList, setTestimonialsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  async function getTestimonials() {
    setAllTestimonials(mock);
    setTestimonialsList(allTestimonials);
  }

  //* erro -> setFunction is not a function
  async function getCategories() {
    // const c = await loadCategorias();
    // console.log(c);
    // setCategoriesList(c);
  }

  //* não está funcionando
  function classificarPorData(classificar) {
    switch (classificar) {
      case "Mais antigas":
        setTestimonialsList(
          allTestimonials.sort((a, b) => {
            return new Date(a.date) < new Date(b.date);
          })
        );
        console.log("antigas", testimonialsList);
        break;
      case "Mais recentes":
        setTestimonialsList(
          allTestimonials.sort((a, b) => {
            return new Date(a.date) > new Date(b.date);
          })
        );
        console.log("recentes", testimonialsList);
        break;
      default:
        setTestimonialsList(
          allTestimonials.sort((a, b) => {
            return new Date(a.date) > new Date(b.date);
          })
        );
        console.log("default", testimonialsList);
        break;
    }
  }

  async function handleUpdate(status, id) {
    const data = { visible: status };
    updateDepoimento(data, id);
  }

  useEffect(() => {
    getTestimonials();
    getCategories();
  }, []);

  return (
    <>
      <Container fluid className="container-admin">
        <div className="container-item" id="mensagens-recebidas">
          <Row className="row-filtro">
            <Col>
              <Row>
                <h2>Depoimentos</h2>
                <p>Visualize e gerencie os depoimentos enviadas pelos alunos</p>
              </Row>
            </Col>
          </Row>
        </div>
        <Container className="container-filtro">
          <div className="filtro-item">
            <Row>
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
                  <Dropdown.Item
                    onClick={() => setClassificar("Mais recentes")}
                  >
                    Mais recentes
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setClassificar("Mais antigas")}>
                    Mais antigas
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Row>
          </div>
          <div className="filtro-item">
            <Row>
              <Form.Label column sm="9">
                Filtrar por status
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
                  {filtroStatus === "visible" && "Visível"}
                  {filtroStatus === "not-visible" && "Não visível"}
                  {filtroStatus === "Sem filtro" && "Sem filtro"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setFiltroStatus("Sem filtro")}>
                    Sem filtro
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setFiltroStatus("visible")}>
                    Visível
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setFiltroStatus("not-visible")}>
                    Não visível
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Row>
          </div>
          <div className="filtro-item">
            {" "}
            <Row>
              <Form.Label column sm="8">
                Filtrar por curso
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
                  {filtroCurso}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setFiltroCurso("Sem filtro")}>
                    Sem filtro
                  </Dropdown.Item>
                  {cursos.map((c, id) => {
                    return (
                      <Dropdown.Item
                        key={id}
                        onClick={() => setFiltroCurso(c.title)}
                      >
                        {c.title}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Row>
          </div>
        </Container>

        <br />

        <div className="container-item">
          <Container className="container-table">
            <Table responsive>
              <thead>
                <tr>
                  <th>CURSO</th>
                  <th>CLIENTE</th>
                  <th>DATA</th>
                  <th>STATUS</th>
                  <th>AÇÃO</th>
                </tr>
              </thead>
              <tbody>
                {testimonialsList?.map((t, id) => {
                  return (
                    <tr key={id}>
                      <td>{t.courseName || "Sem curso"}</td>
                      <td>{t.userName}</td>
                      <td>
                        {new Date(t.createdAt).toLocaleDateString("pt-BR")}
                      </td>
                      <td>
                        {t.visible ? (
                          <Badge pill bg="success">
                            VISÍVEL
                          </Badge>
                        ) : (
                          <Badge pill bg="warning">
                            NÃO VISÍVEL
                          </Badge>
                        )}
                      </td>
                      <td>
                        {t.visible ? (
                          <BsFillEyeFill
                            id="visible"
                            className="icon"
                            onClick={() => {
                              handleUpdate(!t.visible, t.id);
                              // updateMsgList();
                            }}
                          />
                        ) : (
                          <BsFillEyeSlashFill
                            id="visible"
                            className="icon"
                            onClick={() => {
                              handleUpdate(!t.visible, t.id);
                              // updateMsgList();
                            }}
                          />
                        )}
                        <BsTrashFill
                          id="delete"
                          className="icon"
                          onClick={() => {
                            deleteDepoimento(t.id);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Container>
        </div>

        <div id="pagination-container" className="container-item">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={5}
            totalItemsCount={totalItems}
            onChange={loadCategorias}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      </Container>
    </>
  );
}

export default Comunication;

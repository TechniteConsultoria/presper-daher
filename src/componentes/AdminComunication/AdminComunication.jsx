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

import MessageModal from "../Modals/MessageModal";
import { BsFillEyeFill } from "react-icons/bs";

import { useCourse } from "../../contexts/CourseContext";
import MessageService from "../../services/MessageService";

import "./AdminComunication..style.css";
import mensagens from "../../data/mensagens";
import cursos from "../../data/cursos";
import loadPergunta from "../../services/pergunta/perguntaLoad";

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

  const { allCourses } = useCourse();
  const [messagesList, setMessagesList] = useState([]);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [updatedMsgId, setUpdatedMsgId] = useState("");

  const [messageModalShow, setMessageModalShow] = useState(false);
  const [message, setMessage] = useState({});

  const [classificar, setClassificar] = useState("Sem classificação");
  const [filtroStatus, setFiltroStatus] = useState("Sem filtro");
  const [filtroCurso, setFiltroCurso] = useState("Sem filtro");

  useEffect(() => {
    getCourses();
    getMessages();
  }, []);

  useEffect(() => {
    classificarPorData(classificar);
    filtrarPorStatus(filtroStatus);

    // handleFiltro();
  }, [classificar, filtroStatus]);

  useEffect(() => {
    filtrarPorCurso(filtroCurso);

    // handleFiltro();
  }, [filtroCurso]);

  //TODO não está funcionando
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

  // function handleFiltro() {
  //   let list = mensagens;
  //   if (filtroStatus !== "Sem filtro") {
  //     list.filter((c) => c.status === filtroStatus);
  //   }
  //   if (filtroCurso !== "Sem filtro") {
  //     setMessagesList(list.filter((c) => c.course === filtroCurso));
  //   }

  //   console.log(list);
  //   setMessagesList(list);
  // }

  // function setMessageStatus(id) {
  //   const data = {
  //     msgId: id,
  //     status: "read",
  //   };

  //   console.log(data);
  // }

  async function getCourses() {
    //* req http
    // setCourseList(courses);
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

  async function getMessages(page) {
    const query = `?page=${page}`;
    let questions;
    try {
      questions = await loadPergunta()

    } catch (error) {
      console.log(error);
    }

    setMessagesList(questions);
  }

  async function setMsgStatus(id, status) {
    if (status === "NEW") {
      const body = {
        messageId: id,
        messageStatus: status,
      };
      try {
        const response = await MessageService.updateMessageStatus(body);
        console.log(response.status);
      } catch (error) {
        console.log(error);
      }
    }
    return;
  }

  async function updateMsgList() {
    const query = `?page=${page}`;
    try {
      const response = await MessageService.getMessage(query);
      const updatedList = response.data.data;

      setPage(Number(response.data.page));
      setCurrentPage(Number(response.data.page));
      setTotalItems(Number(response.data.total));
      setLastPage(Number(response.data.last_page));

      setMessagesList(updatedList);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Container fluid className="container-admin">
        <div className="container-item">
          <Row className="row-title">
            <Col>
              <h2>Comunicação</h2>
              <p>Visualize e gerencie as mensagens enviadas pelos alunos</p>
            </Col>
          </Row>
        </div>

        <hr></hr>
        <div className="container-item" id="mensagens-recebidas">
          <Row className="row-filtro">
            <Col>
              <Row>
                <h2>Mensagens recebidas</h2>
                <p>Visualize e edite seus cursos cadastrados</p>
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
                  {filtroStatus === "new" && "Novas"}
                  {filtroStatus === "read" && "Visualizadas"}
                  {filtroStatus === "answered" && "Respondidas"}
                  {filtroStatus === "Sem filtro" && "Sem filtro"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setFiltroStatus("Sem filtro")}>
                    Sem filtro
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setFiltroStatus("new")}>
                    Novas
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setFiltroStatus("read")}>
                    Visualizadas
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setFiltroStatus("answered")}>
                    Respondidas
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
                {messagesList?.map((msg, id) => {
                  return (
                    <tr key={id}>
                      <td>{msg.courseName || "Sem curso"}</td>
                      <td>{msg.userName}</td>
                      <td>
                        {new Date(msg.updatedAt).toLocaleDateString("pt-BR")}
                      </td>
                      <td>
                        {}
                        {msg.status === "NEW" && (
                          <Badge pill bg="warning">
                            NOVA
                          </Badge>
                        )}
                        {msg.status === "READ" && (
                          <Badge pill bg="primary">
                            VISUALIZADA
                          </Badge>
                        )}
                        {msg.status === "ANSWERED" && (
                          <Badge pill bg="success">
                            RESPONDIDA
                          </Badge>
                        )}
                      </td>
                      <td>
                        <BsFillEyeFill
                          className="icon"
                          onClick={() => {
                            setMessage(msg);
                            setMsgStatus(msg.id, msg.status);
                            setMessageModalShow(true);
                            setUpdatedMsgId(msg.id);
                            updateMsgList();
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
            // hideDisabled
            activePage={currentPage}
            itemsCountPerPage={5}
            totalItemsCount={totalItems}
            onChange={getMessages}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      </Container>

      <MessageModal
        show={messageModalShow}
        onHide={() => setMessageModalShow(false)}
        message={message}
      />
    </>
  );
}

export default Comunication;

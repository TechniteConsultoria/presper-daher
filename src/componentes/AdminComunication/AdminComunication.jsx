import { useState, useEffect } from "react";

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

import "./AdminComunication..style.css";
import mensagens from "../../data/mensagens";
import cursos from "../../data/cursos";

//*
//TODO - 1. arrrumar os filtros
//TODO - 2. fazer a integração consumindo os dados do back
//*

function Comunication() {
  const courses = cursos;

  // const [buscarCurso, setBuscarCurso] = useState("");

  // const [createCourseModal, showCreateCourseModal] = useState(false);
  // const [course, setCourse] = useState({});

  // const [courseList, setCourseList] = useState([]);

  const [messagesList, setMessagesList] = useState([]);

  const [messageModalShow, setMessageModalShow] = useState(false);
  const [message, setMessage] = useState({});

  const [classificar, setClassificar] = useState("Sem classificação");
  const [filtroStatus, setFiltroStatus] = useState("Sem filtro");
  const [filtroCurso, setFiltroCurso] = useState("Sem filtro");

  //   useEffect(() => {
  //     classificarPorData(classificar);
  //     filtrarPor(filtroStatus);
  //     console.log(classificar);
  //   }, [classificar, filtroStatus]);

  //   useEffect(() => {
  //     buscarPor(buscarCurso);
  //   }, [buscarCurso]);

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

  function setMessageStatus(id) {
    const data = {
      msgId: id,
      status: "read",
    };

    console.log(data);
  }

  async function getCourses() {
    //* req http
    // setCourseList(courses);
  }

  async function getMessages() {
    //* req http
    setMessagesList(mensagens);
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
                      <td>{msg.course}</td>
                      <td>{msg.author}</td>
                      <td>{msg.date}</td>
                      <td>
                        {}
                        {msg.status === "new" && (
                          <Badge pill bg="warning">
                            NOVA
                          </Badge>
                        )}
                        {msg.status === "read" && (
                          <Badge pill bg="primary">
                            VISUALIZADA
                          </Badge>
                        )}
                        {msg.status === "answered" && (
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
                            setMessageStatus(message.id);
                            setMessageModalShow(true);
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

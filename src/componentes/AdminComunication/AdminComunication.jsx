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

// import deleteComment from "../../services/depoimento/depoimentoDelete.js";
import updateDepoimento from "../../services/depoimento/depoimentoUpdate.js";
import loadCategorias from "../../services/categoria/loadCategorias.js";

//*
//TODO - 1. arrrumar os filtros
//* DONE - 2. fazer a integração consumindo os dados do back
//*
import { useComment } from "../../contexts/CommentsContex";
import VisualizeComment from "../Modals/VisualizeComment";

function Comunication() {
  const { allComments, updateComment, deleteComment } = useComment();
  
  const [messagesList, setMessagesList] = useState([]);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [index, setIndex] = useState(0);

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

  const [allTestimonials, setAllTestimonials] = useState([]);
  const [testimonialsList, setTestimonialsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [showAddBannerModal, isShowAddBannerModal] = useState(false);


  // async function getTestimonials() {
  //   setAllTestimonials(mock);
  //   setTestimonialsList(allTestimonials);
  // }

  //* erro -> setFunction is not a function
  async function getComments() {
    const c = await allComments;
    console.log("c");
    console.log(c);
    setTestimonialsList(c);
  }

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

  async function handleUpdate(data, id) {
    data.isDenunciado = !data.isDenunciado

    console.log(data)

    updateComment(id, data);
  }


  async function handleDelete(id, index){
    deleteComment(id, index)

    let oldList = [...testimonialsList]
    // let oldList = [...products]
    oldList.splice(index, 1)
    setTestimonialsList(oldList)


    
  }

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    getComments();
  }, [allTestimonials]);

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
              {/* <Form.Label column sm="8">
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
              </Dropdown> */}
            </Row>
          </div>
          <div className="filtro-item">
            <Row>
              {/* <Form.Label column sm="9">
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
              </Dropdown> */}
            </Row>
          </div>
          <div className="filtro-item">
            {" "}
            <Row>
              {/* <Form.Label column sm="8">
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
              </Dropdown> */}
            </Row>
          </div>
        </Container>

        <br />

        <div className="container-item">
          <Container className="container-table">
            <Table responsive>
              <thead>
                <tr>
                  <th>VER</th>
                  <th>CURSO</th>
                  <th>CLIENTE</th>
                  <th>DATA</th>
                  <th>STATUS</th>
                  <th>AÇÃO</th>
                </tr>
              </thead>
              <tbody>
                {
                testimonialsList == allComments ? (
                  testimonialsList?.map((t, id) => (
                    <tr key={id}>
                      <td
                      onClick={() => {
                        setIndex(id)
                        isShowAddBannerModal(true)
                      }}
                      >
                        <BsFillEyeFill
                        id="showModal"
                        className="icon"
                        />
                      </td>
                      <td>{t.produto.nome || "Sem curso"}</td>
                      <td>{t.user.name}</td>
                      <td>
                        {new Date(t.createdAt).toLocaleDateString("pt-BR")}
                      </td>
                      <td>
                        {!t.isDenunciado ? (
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
                        {t.isDenunciado ? (
                          <BsFillEyeFill
                            id="visible"
                            className="icon"
                            onClick={() => {
                              handleUpdate(t, t.id);
                              // updateMsgList();
                            }}
                          />
                        ) : (
                          <BsFillEyeSlashFill
                            id="visible"
                            className="icon"
                            onClick={() => {
                              handleUpdate(t, t.id);
                              // updateMsgList();
                            }}
                          />
                        )}
                        <BsTrashFill
                          id="delete"
                          className="icon"
                          onClick={() => {
                            handleDelete(t.id, id);
                          }}
                        />
                      </td>
                    </tr>
                  )
                )
                ):(
                  testimonialsList?.map((t, id) => (
                    <tr key={t.id}>
                      <td
                      onClick={() => {
                        setIndex(id)
                        isShowAddBannerModal(true)
                      }}
                      >
                        <BsFillEyeFill
                        id="showModal"
                        className="icon"/>
                      </td>
                      {/* <td>{"hahahahaahahahah"}</td> */}
                      <td>{t.produto.nome || "Sem curso"}</td>
                      <td>{t.user.name}</td>
                      <td>
                        {new Date(t.createdAt).toLocaleDateString("pt-BR")}
                      </td>
                      <td>
                        {!t.isDenunciado ? (
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
                        {t.isDenunciado ? (
                          <BsFillEyeFill
                            id="visible"
                            className="icon"
                            onClick={() => {
                              handleUpdate(t, t.id);
                              // updateMsgList();
                            }}
                          />
                        ) : (
                          <BsFillEyeSlashFill
                            id="visible"
                            className="icon"
                            onClick={() => {
                              handleUpdate(t, t.id);
                              // updateMsgList();
                            }}
                          />
                        )}
                        <BsTrashFill
                          id="delete"
                          className="icon"
                          onClick={() => {
                            handleDelete(t.id, id);
                          }}
                        />
                      </td>
                    </tr>
                  )
                )
                )

                
                }
              </tbody>
            </Table>
          </Container>
        </div>
        

        <div id="pagination-container" className="container-item">
          {/* <Pagination
            activePage={currentPage}
            itemsCountPerPage={5}
            totalItemsCount={totalItems}
            onChange={loadCategorias}
            itemClass="page-item"
            linkClass="page-link"
          /> */}
        </div>
      </Container>
      <VisualizeComment
        show={showAddBannerModal}
        onHide={() => isShowAddBannerModal(false)}
        comment={testimonialsList[index]}
      />
    </>
  );
}

export default Comunication;

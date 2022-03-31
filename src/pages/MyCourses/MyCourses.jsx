import React, { useState, useEffect } from "react";

import "./MyCourses.styles.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";

import MyCoursesCardComponent from "../../componentes/MyCoursesCard/MyCoursesCard";

import cursos from "../../data/cursos";
import categorias from "../../data/categorias";
import clienteProdutoCertificado from "../../services/clienteProdutoCertificado/clienteProdutoCertificado";
import { id } from "../../services/api";
import { Link } from "react-router-dom";

function MyCourses() {
  const [classificar, setClassificar] = useState("Título: A a Z");
  const [filtro, setFiltro] = useState("Sem filtro");
  const [buscarCurso, setBuscarCurso] = useState("");

  const [courseList, setCourseList] = useState([]);

  // useEffect(() => {
  //   classificarPor(classificar);
  //   filtrarPor(filtro);
  // }, [classificar, filtro]);

  // useEffect(() => {
  //   buscarPor(buscarCurso);
  // }, [buscarCurso]);

  function classificarPor(classificar) {
    let sortedList = [];
    if (classificar === "Título: A a Z") {
      sortedList = cursos.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    } else {
      sortedList = cursos.sort((a, b) => {
        return b.title.localeCompare(a.title);
      });
    }
    console.log(sortedList);
    setCourseList(sortedList);
  }

  function filtrarPor(filtro) {
    if (filtro !== "Sem filtro")
      setCourseList(cursos.filter((c) => c.category === filtro));
    else setCourseList(cursos);
  }

  function buscarPor(buscarCurso) {
    setCourseList(
      // eslint-disable-next-line array-callback-return
      cursos.filter((val) => {
        if (!buscarCurso.length) {
          setFiltro(filtro);
          return val;
        } else if (
          filtro === "Sem filtro" &&
          val.title.toLowerCase().includes(buscarCurso.toLowerCase())
        ) {
          return val;
        } else if (
          val.category === filtro &&
          val.title.toLowerCase().includes(buscarCurso.toLowerCase())
        ) {
          return val;
        }
      })
    );
  }
  
  async function  handleListCourses(){
    let clientCourses = await clienteProdutoCertificado.list()
    setCourseList(clientCourses)
  }

  useEffect(
    () => {
      handleListCourses()
    }, []
  )

  return (
    <>
      <Container>
        <Container fluid>
          <div className="container-item">
            <Row className="row-novo-curso">
              <Col>
                <h2>Meus Cursos</h2>
                <p>Vizualize os seus cursos adquiridos</p>
              </Col>
            </Row>
          </div>
          <hr></hr>
          <div className="container-filtro">
            <div className="filtro-item">
              {/* <Form.Label column className="label">
                Pesquisar
              </Form.Label>

              <Form
                // className="search-bar"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <FormControl
                  size="sm"
                  type="search"
                  placeholder="Pesquisar cursos"
                  className="search-bar"
                  id="search-bar-my-account"
                  aria-label="Search"
                  onChange={(e) => {
                    setBuscarCurso(e.target.value);
                  }}
                />
              </Form> */}
            </div>
            <div className="filtros-container">
              <div className="filtro-item">
                {/* <Form.Label column className="label">
                  Classificar por
                </Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    size="sm"
                    style={{
                      backgroundColor: "#fff",
                      border: "1px solid rgb(108, 117, 125, 0.3)",
                      color: "#000",
                      width: "160px",
                    }}
                  >
                    {classificar}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => setClassificar("Título: A a Z")}
                    >
                      Título: A a Z
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setClassificar("Título: Z a A")}
                    >
                      Título: Z a A
                    </Dropdown.Item>
                  </Dropdown.Menu>
                  
                </Dropdown> */}
              </div>
              <div className="filtro-item">
                {/* <Form.Label column className="label">
                  Filtrar por categoria
                </Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    size="sm"
                    style={{
                      backgroundColor: "#fff",
                      border: "1px solid rgb(108, 117, 125, 0.3)",
                      color: "#000",
                      width: "160px",
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
                          onClick={() => setFiltro(item.value)}
                          key={id}
                        >
                          {item.value}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown> */}
              </div>
            </div>
          </div>
        </Container>
        <div className="container-item" id="cursos-list">
          <div className="courses-container">
            {courseList?.map((item) => (
              <Link
              to={`/watch-course/${item.produto.id}`}
              className="resetLink"
              >
                <MyCoursesCardComponent
                  key={item.id}
                  img={item.produto.imagemUrl}
                  title={item.produto.nome}
                  author={item.produto.autor}
                  rating={item.produto.somatoriaDeAvaliacoes}
                  avalationSums={item.somatoriaAvaliacoes}
                  avaliationsQuantity={item.quantidadeAvaliacoes}
                  onClick={() => {
                    //   setCourse(item);
                    //   showEditCourseModal(true);
                  }}
                />
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}

export default MyCourses;

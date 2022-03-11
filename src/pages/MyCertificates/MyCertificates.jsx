import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CertificateCard from "../../componentes/CertificateCard/CertificateCard";
import clienteProdutoCertificado from "../../services/clienteProdutoCertificado/clienteProdutoCertificado";

import "./MyCertificates.styles.css";

import cursos from "../../data/cursos";

function MyCertificates() {

  const certificates = cursos;

  const [classificar, setClassificar] = useState("Título: A a Z");
  const [filtro, setFiltro] = useState("Sem filtro");
  const [buscarCurso, setBuscarCurso] = useState("");

  const [certificatesList, setCertificatesList] = useState([]);

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
      sortedList = certificates.sort((a, b) => {
        return a.title > b.title;
      });
    } else {
      sortedList = certificates.sort((a, b) => {
        return a.title < b.title;
      });
    }
    console.log(sortedList);
    setCertificatesList(sortedList);
  }

  function filtrarPor(filtro) {
    if (filtro !== "Sem filtro")
      setCertificatesList(certificates.filter((c) => c.category === filtro));
    else setCertificatesList(certificates);
  }

  function buscarPor(buscarCurso) {
    setCertificatesList(
      // eslint-disable-next-line array-callback-return
      certificates.filter((val) => {
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

  async function handleListCourses(){
    let clientCourses = await clienteProdutoCertificado.listWithFilter('isActive', 1)
    setCertificatesList(clientCourses)
  }


  // useEffect(
  //   () => {
  //     handleListCourses()
  //   }, []
  // )

  
  return (
    <>
      <Container>
        <Container fluid className="container-my-certificates">
          <div className="container-item">
            <Row className="row-novo-curso">
              <Col>
                <h2>Meus Certificados</h2>
                <p>Vizualize os seus certificados de conclusão de curso</p>
              </Col>
            </Row>
          </div>
          <hr></hr>
          <div className="container-filtro">
            <div className="filtro-item">
              <Form.Label column sm="6">
                Pesquisar
              </Form.Label>
              <Form className="search-bar">
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
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                />
              </Form>
            </div>
            <div className="filtro-item">
              <Form.Label column sm="11">
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
                    marginLeft: "0px",
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
              </Dropdown>
            </div>
            {/* <div className="filtro-item">
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
                  {certificates?.map((item, id) => {
                    return (
                      <Dropdown.Item
                        onClick={() => setFiltro(item.value)}
                        key={id}
                      >
                        {item.category}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div> */}
          </div>
        </Container>
        <div className="container-item" id="cursos-list">
          <div className="courses-container">
            {certificatesList?.map((item) => (
              <CertificateCard
                key={item.id}
                title={item.title}
                author={item.author}
                onClick={() => {
                  //   setCourse(item);
                  //   showEditCourseModal(true);
                }}
              />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}

export default MyCertificates;

import React, { useState, useEffect } from "react";

import AddBannerModal from "../Modals/AddBannerModal";
import BannerCard from "../BannerCard/BannerCard";

import {
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  Form,
  FormControl,
} from "react-bootstrap";


import { useBanner } from "../../contexts/BannerContext";

function Banners(props) {
  const { allBanners } = useBanner();


  const [showAddBannerModal, isShowAddBannerModal] = useState(false);

  const [bannersList, setBannersList] = useState([]);

  async function getBanners() {
    try {
      
      let bannerData = await allBanners

      setBannersList(bannerData);
      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getBanners();
  }, [allBanners]);

  return (
    <>
      <Container fluid className="container-admin">
        <div className="container-item">
          <Row className="row-novo-curso">
            <Col>
              <h2>Banners</h2>
              <p>Cadastre um novo banner</p>
            </Col>
            <Col>
              <Button
                style={{
                  backgroundColor: "#14B8A6",
                  border: "none",
                  boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
                }}
                onClick={() => {
                  isShowAddBannerModal(true);
                }}
              >
                NOVO BANNER
              </Button>
            </Col>
          </Row>
        </div>
        <hr></hr>
        <div className="container-item" id="cursos-cadastrados">
          <Row className="row-filtro">
            <Col>
              <Row>
                <h2>Banners Cadastrados</h2>
                <p>Visualize e edite seus banners cadastrados</p>
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
                  //   setBuscarCurso(e.target.value);
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
                {/* {classificar} */}
              </Dropdown.Toggle>

              {/* <Dropdown.Menu>
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
              </Dropdown.Menu> */}
            </Dropdown>
          </div>
          <div className="filtro-item">
            {/* <Form.Label column sm="10">
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
        </Container>

        <div className="container-item" id="cursos-list">
          <div className="courses-container">
            {bannersList?.map((banner) => {
              return (
                <BannerCard
                  key={banner.id}
                  id={banner.id}
                  title={banner.titulo}
                  status={banner.status}
                  action={() => {
                    console.log("Executa uma ação");
                  }}
                />
              );
            })}
          </div>
        </div>
      </Container>

      <AddBannerModal
        show={showAddBannerModal}
        onHide={() => isShowAddBannerModal(false)}
      />
    </>
  );
}

export default Banners;

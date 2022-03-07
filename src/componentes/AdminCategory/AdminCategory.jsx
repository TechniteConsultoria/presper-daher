import "./AdminCategory.styles.css";
import { useState, useEffect } from "react";
// import Pagination from "react-js-pagination";
import CreateCategoryModal from "../Modals/CreateCategoryModal";
import EditCategoryModal from "../Modals/EditCategoryModal";

import { BsFillPencilFill } from "react-icons/bs";

import { Container, Row, Col, Button, Table } from "react-bootstrap";

const axios = require("axios").default;

function Category() {
  const [showCreateCategoryModal, isShowCreateCategoryModal] = useState(false);
  const [showEditCategoryModal, isShowEditCategoryModal] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [category, setCategory] = useState({});

  async function getCategories() {
    const url = "https://fake-api-json-server-presper.herokuapp.com/categorias";
    try {
      await axios.get(url).then((res) => {
        setCategoriesList(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Container fluid className="container-admin">
        <div className="container-item">
          <Row className="row-title">
            <Col>
              <h2>Categorias</h2>
              <p>Adicione novas categorias de cursos</p>
            </Col>
            <Col>
              <Button
                style={{
                  backgroundColor: "#14B8A6",
                  border: "none",
                  boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
                }}
                onClick={() => {
                  isShowCreateCategoryModal(true);
                }}
              >
                NOVA CATEGORIA
              </Button>
            </Col>
          </Row>
        </div>
        <hr></hr>
        <div className="container-item" id="mensagens-recebidas">
          <Row className="row-filtro">
            <Col>
              <Row>
                <h2>Todas categorias</h2>
                <p>Visualize e edite seus cursos cadastrados</p>
              </Row>
            </Col>
          </Row>
        </div>

        <div className="container-item">
          <Container className="container-table">
            <Table responsive>
              <thead>
                <tr>
                  <th>CATEGORIA</th>
                  <th>ADICIONADO EM</th>
                  <th>AÇÃO</th>
                </tr>
              </thead>
              <tbody>
                {categoriesList?.map((cat, id) => {
                  return (
                    <tr key={id}>
                      <td>{cat.name}</td>

                      <td>
                        {new Date(cat.createdAt).toLocaleDateString("pt-BR")}
                      </td>

                      <td className="icons-column">
                        <BsFillPencilFill
                          className="icon"
                          id="icon-edit"
                          onClick={() => {
                            setCategory(cat);
                            isShowEditCategoryModal(true);
                            console.log(category);
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

      <CreateCategoryModal
        show={showCreateCategoryModal}
        onHide={() => isShowCreateCategoryModal(false)}
      />

      <EditCategoryModal
        show={showEditCategoryModal}
        onHide={() => isShowEditCategoryModal(false)}
        category={category}
      />
    </>
  );
}

export default Category;

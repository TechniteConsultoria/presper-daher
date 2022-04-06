import "./AdminCategory.styles.css";
import { useState, useEffect } from "react";
// import Pagination from "react-js-pagination";
import CreateCategoryModal from "../Modals/CreateCategoryModal";
import EditCategoryModal from "../Modals/EditCategoryModal";

import loadCategorias from '../../services/categoria/loadCategorias'

import { BsFillPencilFill, BsFillTrash2Fill, BsFillTrashFill, BsTrash } from "react-icons/bs";

import { Container, Row, Col, Button, Table } from "react-bootstrap";

import { useCategory } from "../../contexts/CategoryContext";


function Category() {

  const { allCategorys, deleteCategory } = useCategory();


  const [showCreateCategoryModal, isShowCreateCategoryModal] = useState(false);
  const [showEditCategoryModal, isShowEditCategoryModal] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [category, setCategory] = useState({});

  async function getCategories() {
    try {
      let categoryList = await allCategorys
      setCategoriesList(categoryList)
      console.log(categoryList)
    }
    catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteCategory(id){
    await deleteCategory(id)
  }

  useEffect(() => {
    getCategories();
    console.log(allCategorys)
  }, [allCategorys]);

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
                <p>Visualize e edite as categorias cadastradas</p>
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
                {
                categoriesList == allCategorys ? (
                  categoriesList?.map((cat, id) => (
                    <tr key={id}>
                      <td>{cat.nome}</td>

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
                            console.log(cat);
                          }}
                        />
                         <BsFillTrashFill
                          className="icon"
                          id="icon-delete"
                          onClick={() => {
                            handleDeleteCategory(cat.id);
                            console.log(cat);
                          }}
                        />
                      </td>
                    </tr>
                  )
                )
                ) : (
                  categoriesList?.map((cat, id) => (
                    <tr key={id}>
                      <td>{cat.nome}</td>

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
                            console.log(cat);
                          }}
                        />
                        

                        <BsFillPencilFill
                          className="icon"
                          id="icon-delete"
                          onClick={() => {
                            setCategory(cat);
                            isShowEditCategoryModal(true);
                            console.log(cat);
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

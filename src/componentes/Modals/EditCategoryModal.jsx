import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import ResultEditCategoryModal from "./ResultEditCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

const axios = require("axios").default;

function EditCategoryModal(props) {
  const [showResultModal, isShowResultModal] = useState(false);
  const [showDeleteModal, isShowDeleteModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [result, setResult] = useState("");

  async function handleSubmit() {
    //* APENAS PARA DESENVOLVIMENTO ------>
    const id = props.category.id;
    const data = {
      name: categoryName,
      createdAt: Date.now(),
    };
    const url = "https://fake-api-json-server-presper.herokuapp.com/categorias";
    try {
      axios.put(`${url}/${id}`, data).then((res) => {
        setResult(res.status);
        isShowResultModal(true);
      });
    } catch (error) {
      console.error(error);
    }
    //* APENAS PARA DESENVOLVIMENTO ------>
  }

  useEffect(() => {}, []);

  return (
    <>
      <Modal {...props} centered animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Editar categoria</Modal.Title>
        </Modal.Header>
        <Form
          action="submit"
          onSubmit={() => {
            handleSubmit();
            props.onHide();
          }}
        >
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label column sm="2">
                Categoria
              </Form.Label>
              <Form.Control
                type="text"
                defaultValue={props.category.name}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button
              type="submit"
              style={{
                backgroundColor: "#fff",
                border: "1px solid rgb(108, 117, 125, 0.3)",
                color: "#000",
              }}
              onClick={() => {
                isShowDeleteModal(true);
                props.onHide();
              }}
            >
              Remover
            </Button>

            <Button
              style={{
                border: "none",
                boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
              }}
              variant="danger"
              onClick={() => {
                props.onHide();
                setCategoryName("");
              }}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              style={{
                backgroundColor: "#14B8A6",
                border: "none",
                boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
              }}
            >
              Editar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <DeleteCategoryModal
        show={showDeleteModal}
        onHide={() => {
          isShowDeleteModal(false);
        }}
        category={props.category}
      />

      <ResultEditCategoryModal
        show={showResultModal}
        onHide={() => isShowResultModal(false)}
        result={result}
      />
    </>
  );
}

export default EditCategoryModal;

import React, { useState, useEffect } from "react";

import "./Perfil.styles.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";

import MaskedInput from "react-maskedinput";

import { BsPencilFill } from "react-icons/bs";
import loadUser from "../../services/user/loadUser";
import { token } from "../../services/api";
import updateUser from "../../services/user/updateUser";
import { toast } from "react-toastify";

const axios = require("axios").default;

function Perfil(props) {
  const [hasError, setHasError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [user, setUser] = useState({});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profession, setProfession] = useState("");
  const [bio, setBio] = useState("");
  const [pic, setPic] = useState("");

  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    // props.handleFile(fileUploaded);
    setPic(fileUploaded);
  };
  
  async function handleLoadUser(){
    const loggedInUser = await loadUser(token)

    if (!loggedInUser) {
      toast.error("Usuário não encontrado, tente recarregar a página, por favor")
      return
    }

    setUser(loggedInUser);
    

  }

  async function handleUpdateUser(){
    const id = user.id;
    const data = {
      name:       name       || user.name,
      email:      email      || user.email,
      phone:      phone      || user.phone,
      profession: profession || user.profession,
      bio:        bio        || user.bio,
      pic:        pic        || user.pic,
    };

    console.log(data);
    console.log(user);

    try {
      //uses token from localStorage, which is setted in login and singup
      let updatedUser = updateUser(id, data)
    }

    catch (error) {
      setHasError(true);
      console.log(error);
    }

  }

  const handleSubmit = () => {
    handleUpdateUser()
  };


  useEffect(() => {
    handleLoadUser()
  }, []);

  // useEffect(() => {}, [user]);

  return (
    <>
      <Container>
        <Container fluid className="container-perfil">
          <div className="container-item">
            <Row>
              <Col>
                <h2>Meu Perfil</h2>
                <p>Altere sua informações pessoais</p>
              </Col>
            </Row>
          </div>
          <hr></hr>
          <div className="container-content">
            <div className="pic-section">
              <Image className="img" roundedCircle src={user.pic}></Image>
              <button className="btn" onClick={handleClick}>
                Editar <BsPencilFill />
              </button>
              <Form.Control
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: "none" }}
              />
            </div>
            <div className="form-section">
              <Form className="form">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label column sm="5">
                    Nome completo
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={user.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label column sm="5">
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    defaultValue={user.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label column sm="5">
                    Telefone
                  </Form.Label>
                  {/* <Form.Control
                    type="text"
                    defaultValue={user.phone}
                    onChange={(e) => setPhone(e.target.value)}
                  /> */}
                  <MaskedInput
                    className="masked-input"
                    type="text"
                    name="phoneNumber"
                    mask="(11) 11111-1111"
                    value={user.phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label column sm="5">
                    Profissão
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={user.profession}
                    onChange={(e) => setProfession(e.target.value)}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label column sm="5">
                    Biografia
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    defaultValue={user.bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </Form.Group>

                <div className="container-btn">
                  <Button
                    style={{
                      backgroundColor: "#14B8A6",
                      border: "none",
                      boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
                      color: "white",
                    }}
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    SALVAR
                  </Button>
                </div>
                <div>
                  {showAlert && (
                    <Alert variant={hasError ? "danger" : "success"}>
                      {hasError
                        ? "Ops! Ocorreu um erro ao alterar suas informações. Tente novamente."
                        : "Suas informações foram alteradas com sucesso!"}
                    </Alert>
                  )}
                </div>
              </Form>
            </div>
          </div>
        </Container>
      </Container>
    </>
  );
}

export default Perfil;

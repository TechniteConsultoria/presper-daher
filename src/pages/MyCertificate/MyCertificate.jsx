import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";


import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CertificateCard from "../../componentes/CertificateCard/CertificateCard";
import clienteProdutoCertificado from "../../services/clienteProdutoCertificado/clienteProdutoCertificado";

import moment from 'moment'
import 'moment/locale/pt';

import "./MyCertificate.styles.css";
import cursos from "../../data/cursos";
import { id } from "../../services/api";

function MyCertificate() {
  moment.locale('pt')
  const { id } = useParams();

  const [certificate, setCertificate] = useState([]);
  const [courseDate,  setCourseDate ] = useState({});

  
  async function handleListCourses(id){
    let clientCourses = await clienteProdutoCertificado.find(id)
    console.log(clientCourses)
    setCertificate(clientCourses)
    
    setCourseDate(new Date( clientCourses?.updatedAt))
  }


    useEffect(
      () => {
        handleListCourses(id)
      }, [id]
    )
  
  return (
    <>
      <div>
        <Container fluid className="container-my-certificate">
          <div className="container-item">
            <Row className="row-novo-curso">
              <Col>
                {/* <h2>Meus Certificados</h2> */}
                {/* <p>Vizualize os seus certificados de conclusão de curso</p> */}
              </Col>
            </Row>
          </div>
          {/* <hr/> */}
        </Container>
            {
            certificate?
              (
              <div
              className="courseContainer"
              >
                <div className="course">
                  <p>
                    <span>Certifica-se que </span> 
                    <br/>
                    {certificate?.user?.name}
                  </p>
                </div>
                <div>
                  <p>
                    <span>Completou o curso</span>
                    <br/>
                    {certificate?.produto?.nome}
                  </p>
                </div>
                <div>
                  {/* <p>{new Date( certificate?.updatedAt )}</p> */}
                  {/* <p>{`${new Date( certificate?.updatedAt)}`}</p> */}
                  {/* <p>Neste dia {courseDate?.getDate()} de {courseDate?.getMonth()} de {courseDate?.getYear()}</p> */}
                  <p>  
                  {
                  moment(courseDate).format('LLLL')} </p>
                </div>
                <div>
                  <p>
                    <span
                    className="assinado"
                    >
                      Assinado
                    </span>
                  </p>
                </div>
            </div>
            ): false
            }
      </div>
    </>
  );
}

export default MyCertificate;

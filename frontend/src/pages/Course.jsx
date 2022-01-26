import React from "react";
import { Container } from "react-bootstrap";

import CourseInfoComponent from "../componentes/CourseInfo/CourseInfo";

function Course() {
  // const image =
  //   "https://cdn.pixabay.com/photo/2018/07/15/10/44/dna-3539309_1280.jpg";

  const course = {
    id: 1,
    img: "https://cdn.pixabay.com/photo/2015/07/10/20/54/stethoscope-840125__340.jpg",
    title: "Bases Patológicas",
    category: "Patologia",
    author: "Julio Almeida",
    rating: 4,
    price: 199.99,
    description:
      "Mussum Ipsum, cacilds vidis litro abertis. Casamentiss faiz malandris se pirulitá.Aenean aliquam molestie leo, vitae iaculis nisl.Quem num gosta di mé, boa gentis num é.Interagi no mé, cursus quis, vehicula ac nisi.\nEm pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose.Interagi no mé, cursus quis, vehicula ac nisi.Quem manda na minha terra sou euzis!Atirei o pau no gatis, per gatis num morreus.\nNão sou faixa preta cumpadi, sou preto inteiris, inteiris.Sapien in monti palavris qui num significa nadis i pareci latim.Quem num gosta di mim que vai caçá sua turmis!Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo!",
    videos: [
      "Aula 01 - Introdução",
      "Aula 02 - Conceitos",
      "Aula 03 - Prática",
      "Aula 04 - Atividade I",
      "Aula 05 - Correção",
    ],
    ratingComents: [
      {
        id: 26,
        img: "https://cdn.pixabay.com/photo/2015/07/10/20/54/stethoscope-840125__340.jpg",
        author: "Carla Soares",
        text: "Mussum Ipsum, cacilds vidis litro abertis. Casamentiss faiz malandris se pirulitá.Aenean aliquam molestie leo, vitae iaculis nisl.Quem num gosta di mé, boa gentis num é.Interagi no mé, cursus quis, vehicula ac nisi.",
        rating: 5,
      },
      {
        id: 27,
        img: "https://cdn.pixabay.com/photo/2015/07/10/20/54/stethoscope-840125__340.jpg",
        author: "Lucia Maria",
        text: "Mussum Ipsum, cacilds vidis litro abertis. Casamentiss faiz malandris se pirulitá.Aenean aliquam molestie leo, vitae iaculis nisl.Quem num gosta di mé, boa gentis num é.Interagi no mé, cursus quis, vehicula ac nisi.",
        rating: 4,
      },
      {
        id: 28,
        img: "https://cdn.pixabay.com/photo/2015/07/10/20/54/stethoscope-840125__340.jpg",
        author: "Elisa Gomes",
        text: "Mussum Ipsum, cacilds vidis litro abertis. Casamentiss faiz malandris se pirulitá.Aenean aliquam molestie leo, vitae iaculis nisl.Quem num gosta di mé, boa gentis num é.Interagi no mé, cursus quis, vehicula ac nisi.",
        rating: 3,
      },
    ],
  };

  return (
    <>
      <Container fluid className="course-container">
        <div
          style={{
            // position: "absolute",
            width: "100%",
            height: "100%",
            top: "0",
            left: "0",
            // opacity: "0.7",
          }}
        >
          {/* <Row>
            <Image
              className="d-block w-100"
              src="https://cdn.pixabay.com/photo/2018/07/15/10/44/dna-3539309_1280.jpg"
              alt="First slide"
              style={{
                margin: "0",
                padding: "0",
              }}
            />
          </Row> */}
        </div>
      </Container>
      <Container fluid="md" className="courses-description">
        <CourseInfoComponent
          title={course.title}
          category={course.category}
          author={course.author}
          count={course.count}
          price={course.price}
          img={course.img}
          description={course.description}
          videos={course.videos}
          ratingComents={course.ratingComents}
        />

        {/* <Container fluid="md">
          <Row>
            <Col>
              <h2>Nome do Curso</h2>
              <h5>Categoria</h5>
              <h6>Author</h6>
              <p>Os melhores cursos para você estudar quando e onde quiser</p>
            </Col>
          </Row>
        </Container> */}

        {/* <Container fluid="md" style={{ marginTop: "100px" }}>
          <Row>
            <Col>
              <h2>Depoimentos</h2>
              <p>Veja o que estão falando sobre nós</p>
              <hr></hr>
            </Col>
          </Row>
        </Container> */}
        {/* <Container fluid="md">
          {comments?.map((item) => (
            <Row>
              <Col key={item.id}>
                <CommentsCard
                  img={item.img}
                  author={item.author}
                  text={item.text}
                  onClick={() => console.log("Clicou no card de ID:", item.id)}
                />
              </Col>
            </Row>
          ))}
        </Container> */}
      </Container>
    </>
  );
}

export default Course;

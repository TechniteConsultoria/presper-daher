import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import Container from "react-bootstrap/Container";
import CardComponent from "../../componentes/Card/Card";


// import productFindWithFilter from "../../services/productFindWithFilter"
import cursoLoad from "../../services/curso/cursoLoad";
import bannerLoad from "../../services/banner/bannerLoad";

import "../CourseCategory/CourseCategory.style.css";

import { useParams } from "react-router-dom";
import productFindWithFilter from "../../services/produto/productFindWithFilter";


function Category (){
  const { id } = useParams();


const [coursesList,     setCoursesList    ] = useState([]);
const [bannerList,      setBannerList     ] = useState([]);


async function getCourses() {
  console.log(id)

  let cursos = await productFindWithFilter("categoriaId", id)

 console.log(cursos)
  setCoursesList(cursos)
}


useEffect(async () => {
  getCourses()

}, [id]);


    return(
        <>
        <Container>
        <div className="content-container"> 
        <h2> Visualize os cursos </h2>
             <p>Confira os cursos disponíveis</p>
        </div>

        <hr></hr>

        <div className="container-item">
            <div className="courses-container">
              {coursesList?.map((item, id) => (
                <Link
                  key={item.id}
                  id="card-link"
                  to={{
                    pathname:`/course-details/${item.id}`,
                    state: { course: item },
                  }}
                >
                  <CardComponent
                    filter={item.id}
                    img={item.imagemUrl}
                    title={item.nome}
                    avalationSums={item.somatoriaAvaliacoes}
                    avaliationsQuantity={item.quantidadeAvaliacoes}
                    author={item.autor}
                    rating={item.rating}
                    price={item.preco}
                    sold={item.sold}
                  />
                </Link>
              ))}
            </div>
          </div>
        </Container>

        
        </>
    )
}

export default Category;

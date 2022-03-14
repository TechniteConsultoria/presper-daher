import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import Container from "react-bootstrap/Container";
import CardComponent from "../../componentes/Card/Card";


import cursoLoad from "../../services/curso/cursoLoad";
import bannerLoad from "../../services/banner/bannerLoad";

import "../CourseCategory/CourseCategory.style.css";



function Category (){


// falta essa parte do filtro de acordo com o curso

//async function loadCategorias(){}

//useEffect(() => {})

const [coursesList,     setCoursesList    ] = useState([]);
const [bannerList,      setBannerList     ] = useState([]);


async function getCourses() {

  let cursos = await cursoLoad()

  setCoursesList(cursos)
}

async function getBanners(){
  let banner = await bannerLoad()

  setBannerList(banner)
}


useEffect(async () => {
  getBanners();
  getCourses()

}, []);


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
                    key={item.id}
                    img={item.imagemUrl}
                    title={item.nome}
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

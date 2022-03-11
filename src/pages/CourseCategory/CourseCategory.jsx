import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";



import "../CourseCategory/CourseCategory.style.css";




function Category (){

const [coursesList, setCoursesList] = useState([]);


    return(
        <>
        <Container>
        <div className="content-container"> 
        <h2> Visualize os cursos </h2>
             <p>Confira os cursos disponíveis</p>
        </div>

        <hr></hr>


        </Container>
        </>
    )
}

export default Category;
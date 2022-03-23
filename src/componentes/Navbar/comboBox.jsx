import React, {  useEffect, useState } from "react";
// import "./Navbar.style.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { FormControl, Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";


function ComboBox(props) {
  // const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  // const [dataList, setDataList] = useState("");
  // console.log(props)
  const dataList = props.data
  // console.log(dataList)

  // useEffect(() => {
  //   setDataList(data)
  //   // console.log(typeof datalist)
  // }, [data])
  
  // // console.log(dataList)
  // const handleFilter = () => {
    
  //   const searchWord = wordEntered;
  //   // setWordEntered(searchWord);
  //   const newFilter = data.filter((value) => {
  //     return Array(value).join().toLowerCase().includes(searchWord.toLowerCase());
  //   });

  //   if (searchWord === "") {
  //     setFilteredData([]);
  //   } else {
  //     setFilteredData(newFilter);
  //   }
  // };

  ///
  
  

  return (
    <div >
      <Form
      onSubmit={
        e => e.preventDefault()
      }
      >
        <FormControl
          type="text"
          placeholder={props.placeholder}
          className="me-2"
          aria-label="Search"
          id="search-bar"
          onSubmit={
            e => e.preventDefault()
          }
          // eslint-disable-next-line no-unused-expressions
          onChange={(e) => {
            setWordEntered(e.target.value)
            e.preventDefault()}}
          value={wordEntered}
          onKeyUp={
            (e) => {
              console.log(e.key)
              if(e.key == "Enter") window.location.pathname = `/course-search/${wordEntered}`
            }
          }
        />

        
      </Form>

      {wordEntered.length != 0 && (
          <div className="dataResult">
            {dataList.filter((val) => {
              if(val.nome.toLowerCase().includes(wordEntered.toLowerCase())){
                return val
              }
            })?.map((value, key) => {  
              return (
                <Link 
                className="dataItem"
                to={`course-details/${value.id}`}
                key={key}
                rel="noreferrer"
                onClick={() => setWordEntered("")}
                >
                  <p> {value.nome} </p>
                </Link>
              );
            })}
          </div>
        )}
    </div>
  );
}

export default ComboBox;
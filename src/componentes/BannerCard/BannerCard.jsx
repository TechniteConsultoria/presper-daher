import React from "react";

import { BsTrashFill, BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import bannerDelete from "../../services/banner/bannerDelete";

import "./BannerCard.styles.css";

function BannerCard(props) {

  async function handleDeleteOne(id){
    console.log(id)
    console.log("clicou")
    await bannerDelete(id)
    
  }

  async function showOne(id){

    console.log(id)

  }

  return (
    <div className="banner-card">
      <div className="banner-title">{props.title}</div>
      <div className="banner-icons">
        <div className="banner-status">
          {props.status ? (
            <BsEyeFill onClick={() => showOne(props.id)} id="active-icon" />
          ) : (
            <BsEyeSlashFill  id="inactive-icon" />
          )}
        </div>
        <div className="banner-action">
          <BsTrashFill onClick={() => handleDeleteOne(props.id)} />
        </div>
      </div>
    </div>
  );
}

export default BannerCard;

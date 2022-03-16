import React from "react";

import { BsTrashFill, BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import bannerDelete from "../../services/banner/bannerDelete";
import bannerUpdate from "../../services/banner/bannerUpdate";

import "./BannerCard.styles.css";

import { useBanner } from "../../contexts/BannerContext";

function BannerCard(props) {
  const { allBanners, deleteBanner, updateBanner } = useBanner();


  async function handleDeleteOne(id){
    console.log(id)
    console.log("clicou")
    await deleteBanner(id)
    
  }

  async function toggleShow(status){
    console.log(status)

    let newStatus;

    if(status == 1){
      newStatus = 0
    }
    else{
      newStatus = 1
    }

    console.log(newStatus)


    let data = {
      status: newStatus
    }

    updateBanner(props.id, data)
  }

  return (
    <div className="banner-card">
      <div className="banner-title">{props.title}</div>
      <div className="banner-icons">
        <div className="banner-status">
          {props.status == 1 ? (
            <BsEyeFill onClick={() => toggleShow(props.status)} id="active-icon" />
          ) : (
            <BsEyeSlashFill onClick={() => toggleShow(props.status)}   id="inactive-icon" />
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

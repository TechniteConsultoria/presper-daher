import React from "react";

import { BsTrashFill, BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

import "./BannerCard.styles.css";

function BannerCard(props) {
  async function handleClick() {
    console.log("Ciclou!");
  }
  return (
    <div className="banner-card">
      <div className="banner-title">{props.title}</div>
      <div className="banner-icons">
        <div className="banner-status">
          {props.status ? (
            <BsEyeFill onClick={handleClick} id="active-icon" />
          ) : (
            <BsEyeSlashFill onClick={handleClick} id="inactive-icon" />
          )}
        </div>
        <div className="banner-action">
          <BsTrashFill />
        </div>
      </div>
    </div>
  );
}

export default BannerCard;

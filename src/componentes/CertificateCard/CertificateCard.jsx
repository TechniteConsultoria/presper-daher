import React from "react";
import { Card } from "react-bootstrap";

import { BsDownload } from "react-icons/bs";

// const certificate = "../../assets/cert.jpg";

function CertificateCard(props) {
  async function generatePDF(name) {
    return null;
  }

  return (
    <>
      <Card
        style={{
          width: "14rem",
          margin: "16px",
          height: "auto",
          borderRadius: "4px 4px 4px 4px",
          boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
          marginTop: "16px",
          // cursor: "pointer",
        }}
        // onClick={this.state.onClick}
      >
        <Card.Img
          variant="top"
          src="https://m.media-amazon.com/images/I/81W5nfYYxoL._AC_SX679_.jpg"
          style={{ borderRadius: "4px 4px 0px 0px", height: "160px" }}
        />

        <Card.Body>
          <Card.Title style={{ fontSize: "14px" }}>{props.title}</Card.Title>
          <Card.Text style={{ fontSize: "12px" }}>{props.author}</Card.Text>

          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              alignItems: "center",
            }}
          >
            <BsDownload
              style={{ fontSize: "24px", cursor: "pointer" }}
              onClick={() => {
                console.log("Download Certificate");
                generatePDF("teste");
              }}
            />
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default CertificateCard;

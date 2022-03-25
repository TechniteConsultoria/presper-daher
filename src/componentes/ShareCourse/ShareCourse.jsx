import "./ShareCourse.styles.css";

import Container from "react-bootstrap/Container";

import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import { ip } from "../../services/api";

function ShareCourse(props) {
  const shareURL = `${ip}/course-details/${props.courseId}`;
  return (
    <>
      <Container>
        <span className="share-course-header">
          Compartilhe esse curso com seus amigos
        </span>
        <div className="share-buttons-container">
          <FacebookShareButton url={shareURL}>
            <FacebookIcon size={40} round={true} />
          </FacebookShareButton>
          <WhatsappShareButton url={shareURL}>
            <WhatsappIcon size={40} round={true} />
          </WhatsappShareButton>
          <TwitterShareButton url={shareURL}>
            <TwitterIcon size={40} round={true} />
          </TwitterShareButton>
          <TelegramShareButton url={shareURL}>
            <TelegramIcon size={40} round={true} />
          </TelegramShareButton>
          <LinkedinShareButton url={shareURL}>
            <LinkedinIcon size={40} round={true} />
          </LinkedinShareButton>
          <EmailShareButton url={shareURL}>
            <EmailIcon size={40} round={true} />
          </EmailShareButton>
        </div>
      </Container>
    </>
  );
}

export default ShareCourse;

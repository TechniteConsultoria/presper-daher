import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Alert } from "react-bootstrap";
import { toast } from "react-toastify";

import "../../pages/WatchCourse/WatchCourse.styles.css";

import "video-react/dist/video-react.css"; // import css

import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
  LoadingSpinner,
} from "video-react";


function ShowVideoModal(props) {
 
  return (
    <>
    {/* 

    */}
      <Modal
      id="testId"
      {...props} 
      animation={false}
      size="lg"
      aria-labelledby="example-modal-sizes-title-lg"
      dialogClassName="modal-90w"
       >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <div
              className="player-wrapper"
              >
                <Player
                poster="/assets/poster.png"
                muted
                // fluid={true}
                fluid={false}
                height={600}
                width={'100%'}
                >
                  <source src={props.url} />
                  <ControlBar>
                    <ReplayControl seconds={10} order={1.1} />
                    <ForwardControl seconds={30} order={1.2} />
                    <CurrentTimeDisplay order={4.1} />
                    <TimeDivider order={4.2} />
                    <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
                    <VolumeMenuButton />
                  </ControlBar>
                </Player>
                {
                }
              </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              style={{
                border: "none",
                boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
              }}
              variant="danger"
              onClick={() => {
                props.onHide();
              }}
            >
              Fechar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ShowVideoModal;

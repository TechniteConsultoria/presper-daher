import "./WatchCourse.styles.css";
import "video-react/dist/video-react.css"; // import css
import React, { useState, useEffect } from "react";

import CourseContent from "../../componentes/CourseContent/CourseContent";
import RateThisCourse from "../../componentes/RateThisCourse/RateThisCourse";
import SendQuestion from "../../componentes/SendQuestion/SendQuestion";
import ShareCourse from "../../componentes/ShareCourse/ShareCourse";

import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
} from "video-react";

import { Tabs, Tab, Container } from "react-bootstrap";

function WatchCourse() {
  const mock = {
    id: 1,
    title: "Título do curso",
    videos: [
      {
        title: "Aula - 1",
        time: "19:45",
        link: "http://mirrorblender.top-ix.org/movies/sintel-1024-surround.mp4",
      },
      {
        title: "Aula - 2",
        time: "13:42",
        link: "http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4",
      },
    ],
  };

  const [key, setKey] = useState("content");
  const [video, setVideo] = useState({});
  const [videos, setVideos] = useState([]);

  function setPlayVideo(video) {
    console.log(video);
    setVideo(video);
  }

  useEffect(() => {
    setVideos(mock.videos);
  }, []);

  return (
    <>
      <div className="player-container">
        <Player poster="/assets/poster.png">
          <source src="http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4" />
          {/* <source src="http://mirrorblender.top-ix.org/movies/sintel-1024-surround.mp4" /> */}
          {/* <source src={video.link} /> */}

          <ControlBar>
            <ReplayControl seconds={10} order={1.1} />
            <ForwardControl seconds={30} order={1.2} />
            <CurrentTimeDisplay order={4.1} />
            <TimeDivider order={4.2} />
            <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
            <VolumeMenuButton disabled />
          </ControlBar>
        </Player>
      </div>
      <Container>
        <div className="video-title">{video.title}</div>
      </Container>
      <Container className="tab-container">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab className="tab-link" eventKey="content" title="Conteúdo">
            <CourseContent videos={videos} onClick={setPlayVideo} />
          </Tab>
          <Tab className="tab-link" eventKey="rate" title="Avaliar">
            <RateThisCourse courseId={mock.id} />
          </Tab>
          <Tab className="tab-link" eventKey="doubts" title="Dúvidas">
            <SendQuestion courseId={mock.id} />
          </Tab>
          <Tab className="tab-link" eventKey="share" title="Compartilhar">
            <ShareCourse courseId={mock.id} />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}

export default WatchCourse;

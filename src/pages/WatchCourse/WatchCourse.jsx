import "./WatchCourse.styles.css";
import "video-react/dist/video-react.css"; // import css
import React, { useState } from "react";

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

import { Tabs, Tab } from "react-bootstrap";

function WatchCourse() {
  const [key, setKey] = useState("content");
  return (
    <>
      <div className="player-container">
        <Player poster="/assets/poster.png">
          <source src="http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4" />
          <source src="http://mirrorblender.top-ix.org/movies/sintel-1024-surround.mp4" />

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
      <div>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="content" title="Conteúdo">
            {/* <Sonnet /> */}
          </Tab>
          <Tab eventKey="rate" title="Avaliar">
            {/* <Sonnet /> */}
          </Tab>
          <Tab eventKey="doubts" title="Dúvidas">
            {/* <Sonnet /> */}
          </Tab>
          <Tab eventKey="share" title="Compartilhar">
            {/* <Sonnet /> */}
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default WatchCourse;

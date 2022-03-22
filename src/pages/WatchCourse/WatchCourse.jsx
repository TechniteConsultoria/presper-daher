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
  LoadingSpinner,
} from "video-react";

import { Tabs, Tab, Container } from "react-bootstrap";

import clienteProdutoCertificado from "../../services/clienteProdutoCertificado/clienteProdutoCertificado";
import getIdFromUrl from '../../utils/getIdFromUrl'
import cursoFindWithRelations from "../../services/curso/cursoFindWithRelations";

import LoadingGif from "../../componentes/LoadingGif";
import { toast } from "react-toastify";

function WatchCourse() {

  const [key   , setKey   ] = useState("content");
  const [video , setVideo ] = useState('');
  const [prodId, setProdId] = useState('');
  const [index , setIndex ] = useState(0);
  const [videos, setVideos] = useState([]);
  const [lastVideo , setLastVideo ] = useState('');

  function setPlayVideo(newVideo, newIndex) {
    console.log("newVideo.url");
    console.log(newVideo.url);

    console.log("newIndex");
    console.log(newIndex);

    setVideo(newVideo);

    setIndex(newIndex)
    
  }

  async function handleLoadCursoModulo(){
    let id  = getIdFromUrl('/watch-course/')
    console.log(id);
    let product = await cursoFindWithRelations(id)
    console.log(product)
    setProdId(product.produto.id)
    console.log(product.produto.id)

    setVideos(product.produtoModulo)
    // setLastVideo(product.produtoModulo[product.produtoModulo.length - 1])
    setVideo(product.produtoModulo[0])
    console.log(product.produtoModulo)

  }

  useEffect(() => {
    handleLoadCursoModulo()
  }, []);

  async function generateCertify(id){
    let data = { isCertificado: 1 }
    console.log("id" + prodId);
    let a  = await clienteProdutoCertificado.update(prodId, data)

    toast.info("Curso Finalizado! Certificado Gerado!")
  }

  return (
    <>
      {video? (

        videos.map(
          (video, videoIndex) => (
            index == videoIndex ? (
          <div
            className="player-container"
            >
              <Player
              poster="/assets/poster.png"
              muted
              // fluid={true}
              fluid={false}
              height={600}
              width={'100%'}
              onEnded={() => {
                if(videoIndex !== videos.length-1) return

                generateCertify(video.id)
              }}
              >
                {/* <source src="http://localhost:8142/api/file/download?privateUrl=tenant/883fa309-da4f-4300-85d5-bb59af61a8ac/produto/imagem1/video3.mp4" /> */}
                <source src={video.url} />
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
                // console.log(video)
              }
            </div>
            ) : false
          )
        )
      ):(
        <LoadingGif/>
      )}


      <Container>
        <div className="video-title">{video.nome}</div>
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
            <RateThisCourse courseId={prodId} />
          </Tab>
          <Tab className="tab-link" eventKey="doubts" title="Dúvidas">
            <SendQuestion courseId={prodId} />
          </Tab>
          <Tab className="tab-link" eventKey="share" title="Compartilhar">
            <ShareCourse courseId={prodId} />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}

export default WatchCourse;

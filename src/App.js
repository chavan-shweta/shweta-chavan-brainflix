import { useState } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import HeroBanner from './components/HeroBanner/HeroBanner';
import videoDetailsFile from './data/video-details.json';

function App() {

  const [videoDetail, setVideoDetail] = useState(videoDetailsFile[0]);

  return (
    <>
      <Header />
      <HeroBanner video={videoDetail} />
    </>
  );
}

export default App;

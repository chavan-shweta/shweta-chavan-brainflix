import { useState } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import HeroBanner from './components/HeroBanner/HeroBanner';
import MainContent from './components/MainContent/MainContent';
import VideoList from './components/VideoList/VideoList'
import videoDetailsFile from './data/video-details.json';
import videoDataFile from './data/videos.json';

function App() {

  const [videoDetail, setVideoDetail] = useState(videoDetailsFile[0]);
  const [videoData, setVideoData] = useState(videoDataFile.filter((video) => video.id !== videoDetail.id));

  const handleVideoListClick = (videoId) => {
    setVideoDetail(videoDetailsFile.find(video => video.id === videoId))
    const filteredVideo = videoDataFile.filter((video) => video.id !== videoId);
    setVideoData(filteredVideo);
  }

  return (
    <>
      <Header />
      <HeroBanner video={videoDetail} />
      <div className='container'>
        <MainContent video={videoDetail} />
        <VideoList videos={videoData} handleVideoListClick={handleVideoListClick} />
      </div>
    </>
  );
}

export default App;

import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import VideoUpload from './components/VideoUpload/VideoUpload';
import VideoPage from './pages/VideoPage';

function App() {

  return (
    <>
      <BrowserRouter>
          <Header />
        <Routes>
          <Route path="/" element={<VideoPage />} />
          <Route path="/videos/:videoId" element={<VideoPage />} />
          <Route path="/upload" element={<VideoUpload />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

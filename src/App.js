import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import VideoDetailsPage from './pages/VideoDetails/VideoDetailsPage';
import VideoUplaodPage from './pages/VideoUpload/VideoUplaodPage';
import PageNotFound from './pages/PageNotFound/PageNotFound';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VideoDetailsPage />} />
        <Route path="/videos/:videoId" element={<VideoDetailsPage />} />
        <Route path="/upload" element={<VideoUplaodPage />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

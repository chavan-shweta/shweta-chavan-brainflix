import './VideoDetailsPage.scss';
import Header from '../../components/Header/Header';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import MainContent from '../../components/MainContent/MainContent';
import VideoList from '../../components/VideoList/VideoList';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { API_URL, API_KEY } from '../../utils/Api'
import axios from 'axios';

const VideoDetailsPage = () => {
    const { videoId } = useParams();
    const [videoList, setVideoList] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    
    window.scrollTo(0, 0);
    document.title = videoId ? "Video Details" : "BrainFlix";

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`${API_URL}/videos?api_key=${API_KEY}`);
                setVideoList(response.data);
                setIsFetching(false);
            } catch (error) {
                console.log('Failed to fetch video list', error);
            }
        }

        fetchVideos();
    }, []);

    if (isFetching) {
        return (
            <p>Loading video data...</p>
        )
    } 

    const selectedVideoId = videoId ? videoId : videoList[0].id;
    const filteredVideoList = videoList.filter(video => video.id !== selectedVideoId);

    return (
        <>
            <Header />
            <HeroBanner videoId={selectedVideoId} />
            <div className='container'>
                <MainContent videoId={selectedVideoId} />
                <VideoList videos={filteredVideoList}/>
            </div>
        </>
    );
};

export default VideoDetailsPage;
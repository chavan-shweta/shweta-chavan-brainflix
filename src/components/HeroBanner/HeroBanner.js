import './HeroBanner.scss';
import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from '../../utils/Api';
import axios from 'axios';

const HeroBanner = ({videoId}) => {
    const [video, setVideo] = useState();

    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                const response = await axios.get(`${API_URL}/videos/${videoId}?api_key=${API_KEY}`);
                setVideo(response.data);
            } catch (error) {
                console.log('Failed to fetch video', error);
            }
        }

        fetchVideoDetails();
    }, [videoId]);

    if (!video) {
        return (
          <p>Loading video...</p>
        )
    }

    return (
        <section className="hero-banner__image">
            <video className='hero-banner__video' poster={video.image} controls>
                <source src={video.video + '?api_key=' + API_KEY} type="video/webm" />    
                <source src={video.video + '?api_key=' + API_KEY} type="video/mp4"/>  
            </video>
        </section>
    );
};

export default HeroBanner;
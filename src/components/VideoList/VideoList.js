import './VideoList.scss';
import '../../styles/partials/_global.scss';
import { Link } from 'react-router-dom';

const VideoList = ({ videos }) => {
    return (
        <ul className="video-list">
            <p className="video-list__title">NEXT VIDEOS</p>
            {videos.map((video) => {
                return (
                    <li key={video.id} className='video-list__details'>
                        <Link to={`/videos/${video.id}`}>
                            <img src={video.image} alt={video.title} className="video-list__image"></img>
                            <div className="video-list__video-info">
                                <p className='video-list__video-title'>{video.title}</p>
                                <p>{video.channel}</p>
                            </div>
                        </Link>
                    </li>
                )
            })}
        </ul>
    );
};

export default VideoList;
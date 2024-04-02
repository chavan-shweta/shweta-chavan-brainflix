import './VideoList.scss'
import '../../styles/partials/_global.scss'

const VideoList = ({ videos, handleVideoListClick }) => {
    return (
        <ul className="video-list">
            <p className="video-list__title">NEXT VIDEOS</p>
            {videos.map((video) => {
                return (
                    <li key={video.id} onClick={() => handleVideoListClick(video.id)} className='video-list__details'>
                        <img src={video.image} className="video-list__image"></img>
                        <div className="video-list__video-info">
                            <p className='video-list__video-title'>{video.title}</p>
                            <p>{video.channel}</p>
                        </div>
                    </li>
                )
            })}
        </ul>
    );
};

export default VideoList;
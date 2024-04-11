import { useState, useEffect } from 'react';
import './MainContent.scss';
import addComment from '../../assets/icons/add_comment.svg';
import views from '../../assets/icons/views.svg';
import likes from '../../assets/icons/likes.svg';
import { API_URL, API_KEY } from '../../utils/Api';
import axios from 'axios';

const MainContent = ({ videoId }) => {

    const [video, setVideo] = useState();
    const [comments, setComments] = useState([]);

    const fetchVideoDetails = async () => {
        try {
            const response = await axios.get(`${API_URL}/videos/${videoId}?api_key=${API_KEY}`);
            setVideo(response.data);
            const commentList = response.data.comments;
            commentList.sort((a, b) => b.timestamp - a.timestamp);
            setComments(commentList);
        } catch (error) {
            console.log('Failed to fetch video details', error);
        }
    }

    useEffect(() => {
        fetchVideoDetails();
    }, [videoId]);

    if (!video) {
        return (
            <p>Loading video details...</p>
        )
    }

    const handleCommentClick = (event) => {
        event.preventDefault();
        const commentVal = event.target.comment.value;

        if (commentVal.trim() === "") {
            let commentField = document.querySelector('.conversation-section__textarea');
            commentField.classList.add('conversation-section__error');
        } else {
            // As per mockup there is no name field, so name value is hard coded
            postComment({ name: "John Doe", comment: commentVal });
            // Clear all form inputs
            event.target.reset();
        }
    }

    const postComment = async (comment) => {
        try {
            const response = await axios.post(`${API_URL}/videos/${videoId}/comments?api_key=${API_KEY}`, comment);
            if (response.status === 201) {
                fetchVideoDetails();
            }
        } catch (error) {
            console.log('Failed to post comment', error);
        }
    }

    const deleteComment = async (commentId) => {
        try {
            const response = await axios.delete(`${API_URL}/videos/${videoId}/comments/${commentId}?api_key=${API_KEY}`);
            if (response.status === 200) {
                fetchVideoDetails();
            }
        } catch (error) {
            console.log('Failed to delete comment', error);
        }
    }

    const handleDeleteClick = (commentId) => {
        deleteComment(commentId);
    }

    const formatDate = (commentDate) => {
        const currentTime = new Date().getTime();
        const commentTime = new Date(commentDate).getTime();

        const timeDiff = currentTime - commentTime;

        const secondsDiff = timeDiff / 1000;     //Calculated seconds
        const minutesDiff = secondsDiff / 60;     //Calculated minutes
        const hoursDiff = minutesDiff / 60;     //Calculated hours
        const daysDiff = hoursDiff / 24;     //Calculated days

        if (secondsDiff < 60) {
            return formatPlural(secondsDiff, 'second');
        } else if (minutesDiff < 60) {
            return formatPlural(minutesDiff, 'minute');
        } else if (hoursDiff < 24) {
            return formatPlural(hoursDiff, 'hour');
        } else if (daysDiff < 7) {
            return formatPlural(daysDiff, 'day');
        } else {
            return new Date(commentDate).toLocaleDateString();
        }
    }

    const formatPlural = (value, unit) => {
        value = parseInt(value);
        if (value > 1) {
            return `${value} ${unit}s ago`;
        } else {
            return `${value} ${unit} ago`;
        }
    }

    return (
        <div className="main-content__wrapper">
            <h1 className="main-content__title">{video.title}</h1>
            <div className="main-content__detail">
                <div className="main-content__info">
                    <span className="main-content__channel">By {video.channel}</span>
                    <label>{new Date(video.timestamp).toLocaleDateString()}</label>
                </div>
                <div className="main-content__social">
                    <span className="main-content__views">
                        <img src={views} alt="View Count" ></img>
                        <label>{video.views}</label>
                    </span>
                    <span className="main-content__likes">
                        <img src={likes} alt="Like Count"></img>
                        <label>{video.likes}</label>
                    </span>
                </div>
            </div>
            <p className='main-content__description'>{video.description}</p>

            <form className="conversation-section" onSubmit={handleCommentClick}>
                <span className="conversation-section__comment-count">{video.comments.length} Comments</span>
                <div className="conversation-section__container">
                    <div className="conversation-section__avtar">
                        <img className="conversation-section__image" alt="" />
                    </div>
                    <div className="conversation-section__wrapper">
                        <div className="conversation-section__details">
                            <div className="conversation-section__comment">
                                <h1 className="conversation-section__label">JOIN THE CONVERSATION</h1>
                                <textarea className="conversation-section__textarea" name="comment" placeholder="Add a new comment"></textarea>
                            </div>
                        </div>
                        <div className="conversation-section__button">
                            <button className="btn">
                                <img className="conversation-section__comment-img" src={addComment} alt="New Comment" ></img>
                                <label className="conversation-section__comment-label">COMMENT</label>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <div className="conversation-wrapper">
                <ul className="conversation-list">
                    {comments.map((comment) => (
                        <li key={comment.id} className="conversation-list__item">
                            <div className="conversation-list__img">
                                <div className="conversation-list__photo"></div>
                            </div>
                            <div className="conversation-list__details">
                                <div className="conversation-list__namedate">
                                    <label className="conversation-list__name">{comment.name}</label>
                                    <span className="conversation-list__date">{formatDate(comment.timestamp)}</span>
                                </div>
                                <p className="conversation-list__comment">{comment.comment}</p>
                                <div className="conversation-list__options">
                                    <span className="material-symbols-sharp" onClick={() => handleDeleteClick(comment.id)}>delete</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MainContent;
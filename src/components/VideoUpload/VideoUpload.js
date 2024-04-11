import './VideoUpload.scss'
import upload from '../../assets/images/Upload-video-preview.jpg'
import publish from '../../assets/icons/publish.svg'
import { useNavigate } from 'react-router-dom';

const VideoUpload = () => {

    const navigate = useNavigate();

    const handleCancelClick = () => {
        navigate("/");
    }

    const handlePublishClick = (event) => {
        event.preventDefault();
        const titleVal = event.target.title.value;
        const descriptionVal = event.target.description.value;

        let titleField = document.getElementById('video-title');
        if (titleVal.trim() === "") {
            titleField.classList.add('video-upload__error');
        } else {
            titleField.classList.remove('video-upload__error');
        }
        let descField = document.getElementById('video-desc');
        if (descriptionVal.trim() === "") {
            descField.classList.add('video-upload__error');
        }else {
            descField.classList.remove('video-upload__error');
        }

        if (titleVal.trim() !== "" && descriptionVal.trim() !== "") {
            alert("Video has been published successfully.");
            // Clear all form inputs
            event.target.reset();
            navigate("/");
        }
    }

    return (
        <form className="video-upload" onSubmit={handlePublishClick}>
            <h1 className="video-upload__heading">Upload Video</h1>
            <div className="video-upload__wrapper">
                <div className="video-upload__preview">
                    <label className="video-upload__label">VIDEO THUMBNAIL</label>
                    <img className="video-upload__video-image" src={upload} alt="upload video"></img>
                </div>
                <div className="video-upload__details">
                    <div className="video-upload__input-fields-container">
                        <label className="video-upload__label">TITLE YOUR VIDEO</label>
                        <input id="video-title" name="title" placeholder="Add a title to your video"></input>
                    </div>
                    <div className="video-upload__input-fields-container">
                        <label className="video-upload__label">ADD A VIDEO DESCRIPTION</label>
                        <textarea id="video-desc" name="description" placeholder="Add a video description to your video"></textarea>
                    </div>
                </div>
            </div>
            <div className="video-upload__publish">
                <button className="btn">
                    <img className="video-upload__publish-img" src={publish} alt="Publish new" />
                    <label className="video-upload__btn-label">PUBLISH</label>
                </button>
                <button className="btn video-upload__cancel" onClick={handleCancelClick}>CANCEL</button>
            </div>
        </form>
    );
};

export default VideoUpload;
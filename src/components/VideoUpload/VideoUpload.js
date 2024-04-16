import './VideoUpload.scss'
import upload from '../../assets/images/Upload-video-preview.jpg'
import publish from '../../assets/icons/publish.svg'
import { useNavigate } from 'react-router-dom';
import { API_URL, API_KEY } from '../../utils/Api'
import axios from 'axios';
import { useState } from 'react';

const VideoUpload = () => {
    const [imageFile, setImageFile] = useState();
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
        } else {
            descField.classList.remove('video-upload__error');
        }

        if (titleVal.trim() !== "" && descriptionVal.trim() !== "") {
            const newVideo = {
                title: titleVal.trim(),
                description: descriptionVal.trim(),
                video: "https://unit-3-project-api-0a5620414506.herokuapp.com/stream"
            };
            uploadVideo(newVideo);
            // Clear all form inputs
            event.target.reset();
        }
    }

    const uploadVideo = async (newVideo) => {
        try {
            let formData = new FormData();
            formData.append('title', newVideo.title);
            formData.append('description', newVideo.description);
            formData.append('video', newVideo.video);
            if (imageFile) {
                formData.append('imageFile', imageFile);
            }
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }
            const response = await axios.post(`${API_URL}/videos/upload?api_key=${API_KEY}`, formData, config);
            if (response.status === 201) {
                alert("Video has been published successfully.");
                navigate("/videos/" + response.data.id);
            }
        } catch (error) {
            console.log('Failed to publish video ', error);
        }
    }

    const handleChange = (event) => {
        setImageFile(event.target.files[0]);
    }

    return (
        <form className="video-upload" onSubmit={handlePublishClick}>
            <h1 className="video-upload__heading">Upload Video</h1>
            <div className="video-upload__wrapper">
                <div className="video-upload__preview">
                    <div className="video-upload__container">
                        <label className="video-upload__label">VIDEO THUMBNAIL</label>
                        <input className="video-upload__thumbnail" type="file" name="file" accept="image/*" onChange={handleChange}></input>
                    </div>
                    <img className="video-upload__video-image" src={imageFile ? URL.createObjectURL(imageFile) : upload} alt="upload video"></img>
                </div>
                <div className="video-upload__details">
                    <div className="video-upload__input-fields-container">
                        <label className="video-upload__label">TITLE YOUR VIDEO</label>
                        <input id="video-title" className="video-upload__data" name="title" placeholder="Add a title to your video"></input>
                    </div>
                    <div className="video-upload__input-fields-container">
                        <label className="video-upload__label">ADD A VIDEO DESCRIPTION</label>
                        <textarea id="video-desc" className="video-upload__data" name="description" placeholder="Add a video description to your video"></textarea>
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
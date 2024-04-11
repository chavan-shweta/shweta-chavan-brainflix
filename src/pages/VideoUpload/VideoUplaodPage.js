import Header from "../../components/Header/Header";
import VideoUpload from "../../components/VideoUpload/VideoUpload";

const VideoUplaodPage = () => {

    document.title = "Video Upload";

    return (
        <>
            <Header />
            <VideoUpload/>
        </>
    );
};

export default VideoUplaodPage;
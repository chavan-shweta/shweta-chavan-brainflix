import './PageNotFound.scss';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {

    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate("/");
    }

    return (
        <div className="error-container">
            <h1>
                404 Page Not Found !!!
            </h1>
            <button className="btn error-container__btn-home" onClick={handleHomeClick}>Go to Home Page</button>
        </div>
    );
};

export default PageNotFound;
import headerLogo from '../../assets/logos/BrainFlix-logo.svg'
import search from '../../assets/icons/search.svg'
import upload from '../../assets/icons/upload.svg'
import avtar from '../../assets/images/Mohan-muruge.jpg'
import '../../styles/partials/_global.scss'
import './Header.scss'

const Header = () => {
    return (
        <header className="site-header">
            <div className="site-header__wrapper">
                <a href="#">
                    <img className="site-header__logo" src={headerLogo} alt="BrainFlix Logo"></img>
                </a>
                <div className="site-header__nav">
                    <div className="site-header__actions">
                        <div className="site-header__search-div">
                            <div className="site-header__search">
                                <img className="site-header__search-img" src={search} alt="Search new"></img>
                                <input className="site-header__search-text" type='text' placeholder='Search'></input>
                            </div>
                            <img className='site-header__avtar-mobile' id="avtar-mobile" src={avtar} alt="Login User"></img>
                        </div>
                        <button className="btn">
                            <img className="site-header__upload-img" src={upload} alt="Upload new" />
                            <label className="site-header__upload-label">UPLOAD</label>
                        </button>
                    </div>
                    <img className='site-header__avtar' src={avtar} alt="Login User"></img>
                </div>
            </div>
        </header>
    );
};

export default Header;
import './HeroBanner.scss'

const HeroBanner = (video) => {
    //console.log(video);
    return (
        <section className="hero-banner__image">
            <video className='hero-banner__video' poster={video.video.image} controls>
                <source src={video.video.video + '?api_key=shweta'} type="video/webm" />    
                <source src={video.video.video + '?api_key=shweta'} type="video/mp4"/>  
            </video>
        </section>
    );
};

export default HeroBanner;
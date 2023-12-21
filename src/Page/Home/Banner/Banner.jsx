import banner from '../../../assets/Image/5031659.jpg';

const Banner = () => {
    return (
        <div className="relative">
            <img  src={banner} alt="" />
            <div className="absolute inset-0 flex items-center justify-center">
                <button className="btn text-white md:btn-lg btn-sm">Let’s Explore</button>
            </div>
        </div>
    );
};

export default Banner;

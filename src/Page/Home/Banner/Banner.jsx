import { useContext } from 'react';
import banner from '../../../assets/Image/5031659.jpg';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';

const Banner = () => {
    const {user}=useContext(AuthContext)
    
    console.log(user)
    return (
        <div className="relative">
            <img  src={banner} alt="" />
            
            {
                user? <div className="absolute inset-0 flex items-center justify-center">
                <Link to='dashboard/taskList'><button className="btn text-white md:btn-lg btn-sm">Let’s Explore</button></Link>
            </div>: <div className="absolute inset-0 flex items-center justify-center">
                <Link to='/login'><button className="btn text-white md:btn-lg btn-sm">Let’s Explore</button></Link>
            </div>
            }
          
        </div>
    );
};

export default Banner;

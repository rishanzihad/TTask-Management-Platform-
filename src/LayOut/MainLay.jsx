import { Outlet, useLocation } from "react-router-dom";

import NavBar from "../Shared/Navbar/NavBar";

import { Toaster } from "react-hot-toast";


const MainLay = () => {
    
    const location =useLocation()
    const noHeaderFooter =location.pathname.includes('login')||location.pathname.includes('register')
    return (
        <div className="max-w-[1200px] mx-auto">
            {noHeaderFooter ||   <NavBar></NavBar>}
     
           <Outlet></Outlet>
          
         
            <Toaster/>
        </div>
    );
};


export default MainLay;
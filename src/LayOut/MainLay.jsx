import Home from "../Page/Home/Home";
import NavBar from "../Shared/Navbar/NavBar";


const MainLay = () => {
    return (
        <div className=" max-w-[1200px] mx-auto ">
        <NavBar></NavBar>
            <Home></Home>
        </div>
    );
};

export default MainLay;
import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { IoMdAddCircleOutline, } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const DropdownMenu = ({ isAdmin, isMenuOpen, closeMenu }) => {

  return (
    <ul className={`menu p-4 ${isMenuOpen ? "block" : "hidden"} md:block`}>
     
        <>
          <li>
            <NavLink to="dashboard/createtask">
            <IoMdAddCircleOutline /> Crate Task
            </NavLink>
          </li>
          <li>
            <NavLink to="taskList">
              <FaHome></FaHome>Task List
            </NavLink>
          </li>
          
        </>
     
      <div className="divider"></div>
      <li>
        <NavLink to="/">
          <FaHome></FaHome> Home
        </NavLink>
      </li>
    
      <li>
        <NavLink to="/order/contact">
          <FaEnvelope></FaEnvelope> Contact
        </NavLink>
      </li>
    </ul>
  );
};

const Dashboard = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const {user}=useContext(AuthContext)
 

  const handleToggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="md:flex max-w-[1200px] mx-auto">
   
    <div className="md:w-64 md:min-h-screen text-white bg-green-400">
    <div className="w-10 ml-10 flex gap-4 md:mt-5 rounded-full">
         <img src={user?.photoURL} alt="" />
          <h1>{user?.displayName}</h1>
            </div>
      <div className="menu-toggle flex justify-center items-center md:hidden" onClick={handleToggleMenu}>
        <button className="flex items-center text-2xl font-bold">
          <IoMenu className="mr-2" /> Menu
        </button>
      </div>
      <DropdownMenu  isMenuOpen={isMenuOpen} closeMenu={handleCloseMenu} />
    </div>

    <div className="flex-1 md:w-full p-8">
      <Outlet />
    </div>
  </div>
  );
};

export default Dashboard;

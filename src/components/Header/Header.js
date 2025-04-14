import { useState, useEffect } from "react";
import { LOGO_LINK } from "../../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../../utils/useOnlineStatus";


export  const Header = () => {
  /**TODO:Never declare any hooks under condition and looping and outside the higher function */
  const [toggleBtn,setToggleBtn] = useState("Log In");
  const onlineStatus = useOnlineStatus(true);

  /**Initially it is call atleast once
   * if no dependency ==> then render every time
   * if dependency with empty array ==> called once
   * if dependency on any value ==> then render when changes happen
   */
  useEffect(()=>{console.log("I am rendering on condition😎")},[]);
  // TOggle Login LogOut
  const handleLoginBtn = ()=>{
    toggleBtn == "Log In"? setToggleBtn("Log Out"): setToggleBtn("Log In");
  }
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
      <div className="w-24">
        <img src={LOGO_LINK} alt="Logo" className="w-full h-auto" />
      </div>
      <nav>
        <ul className="flex gap-6 items-center text-lg font-medium">
          <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
          <li><Link to="/about" className="hover:text-blue-600">About</Link></li>
          <li><Link to="/form" className="hover:text-blue-600">Form</Link></li>
          <li><Link to="/" className="hover:text-blue-600">🧑‍🦲Sign In</Link></li>
          <li><Link to="/grocery" className="hover:text-blue-600">Grocery🍰</Link></li>
          <li>Status: {onlineStatus ? "🟢" : "🔴"}</li>
          <li>
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
              onClick={handleLoginBtn}
            >
              {toggleBtn}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user); //it gives information about store in user data


  //  profile/view gives me information about loggedin user
  const fetchUser = async () => {
    try {
      const user = await axios.get( "http://localhost:3002/profile/view", {
        withCredentials: true,
      });
      // console.log(user.data);
      dispatch(addUser(user.data)); 
      // addUser belongs to userSlice we are updating data of loggedin user in our store through userSlice
    } catch (err) {
      if (err.status == 401) {
        navigate("/login");
      }
      console.log(err);
    }
  };


  // earlier when we use to refresh page user use to log out but now even if we refresh the page user remains loggedin because of fetchuser function
  // user will only logout if we remove the token or we click on logout section

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);
  return (
    <div>
      <Navbar />
      <div className="pt-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;

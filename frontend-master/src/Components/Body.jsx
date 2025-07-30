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
  const user = useSelector((store) => store.user); // Get user from store

  const fetchUser = async () => {
    const token = localStorage.getItem("token"); // ✅ Get token from storage

    if (!token) {
      // ✅ No token means user not logged in → redirect
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(addUser(res.data)); // ✅ Store user in Redux
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401) {
        // ✅ Token is invalid or expired
        localStorage.removeItem("token"); // Clear bad token
        navigate("/login");
      }
    }
  };

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

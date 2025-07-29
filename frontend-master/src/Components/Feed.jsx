import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  console.log(feed);
  const getFeed = async () => {
    if (feed) return;
    try {
      const feed = await axios.get( "http://localhost:3002/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(feed.data)); //adding data in store through addFeed function through feedSlice store
      // console.log(feed);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getFeed();
  });

  if (!feed) return;

  if (feed.length <= 0)
    return (
      <h1 className=" flex justify-center m-52 text-3xl">No more users!!!!</h1>
    );
  
    //we are creating out cards for left swipe and right swipe, we are adding the user card, feed[0] se phla card aega ab use accept krna hai ya reject
    // vo <userCard> me props add krke pta chlega
  return (
    feed && (
      <div className="flex flex-col items-center gap-4 my-5">
        {feed && feed.map((user) => <UserCard key={user._id} user={user} />)}
         <UserCard user={feed[0]} /> 
      </div>
    )
  );
};

export default Feed;
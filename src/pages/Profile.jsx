import "./Profile.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getProfile } from "../features/profile/request";
import Post from "../components/Post";
import ProfileHeader from "../components/ProfileHeader";
import Loader from "../components/Loader";

const Profile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { profileStatus } = useSelector((state) => state.profile);
  const {
    profile: {
      followers,
      following,
      name,
      profilePhoto,
      username,
      description,
    },
  } = useSelector((state) => state.profile);

  const { post } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfile({ userId }));
    // eslint-disable-next-line
  }, [userId]);

  return (
    <div>
      {profileStatus === "dataReceived" ||
      profileStatus === "addingInteraction" ? (
        <div>
          {/* Profile Header */}
          <ProfileHeader
            followers={followers}
            following={following}
            userId={userId}
            name={name}
            profilePhoto={profilePhoto}
            username={username}
            description={description}
          />
          {/* Post */}
          {post.map((post) => (
            <Post
              user={{ name, username, profilePhoto }}
              _id={post._id}
              caption={post.caption}
              photo={post.photo}
              time={post.time}
              likes={post.likes}
              comment={post.comment}
              page="PROFILE"
              key={post._id}
            />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Profile;

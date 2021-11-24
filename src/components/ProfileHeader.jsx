import "./ProfileHeader.css";
import { Link } from "react-router-dom";
import useImage from "../hooks/useImage";
import { logout } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import useFollow from "../hooks/useFollow";

const ProfileHeader = ({
    userId,
    name,
    profilePhoto,
    username,
    description,
}) => {
    const { handleFollow, handleUnFollow, isFollowed } = useFollow(userId);
    const { userId: loggedInUser } = useSelector((state) => state.auth);

    const imageLink = useImage(profilePhoto, name);
    const dispatch = useDispatch();

    return (
        <div className="profile-header">
            <img
                src={imageLink}
                className="profile-header__photo"
                alt="profile"
            />
            <div className="heading heading--h6 mt-0-5">{name}</div>
            <div className="profile-header__username">@{username}</div>
            <div className="profile-header__description">{description}</div>
            <div className="profile-header__button-container mt-1">
                {userId === loggedInUser ? (
                    <>
                        <Link
                            className="btn profile-header__button-edit"
                            to={`/profile/${userId}/setting`}
                        >
                            Edit
                        </Link>
                        <button
                            className="btn profile-header__button-logout ml-1"
                            onClick={() => dispatch(logout())}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="btn"
                            onClick={
                                isFollowed
                                    ? () => handleUnFollow(userId)
                                    : () => handleFollow(userId)
                            }
                        >
                            {isFollowed ? "Unfollow" : "Follow"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProfileHeader;
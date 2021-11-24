import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Post from "../components/Post";
import Loader from "../components/Loader";
import { getSinglePost } from "../features/post/request";

const PostPage = () => {
    const dispatch = useDispatch();
    const { id: postId } = useParams();

    const { singlePost, postStatus } = useSelector((state) => state.post);
    useEffect(() => {
        dispatch(getSinglePost({ postId }));
    }, [postId]);
    return (
        <div>
            {postStatus === "receivedSingPost" ? (
                <div>
                    <Post {...singlePost} />
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default PostPage;
import { createSlice } from "@reduxjs/toolkit";
import {
    getFeed,
    newPost,
    likePost,
    removeLikePost,
    commentPost,
    getSinglePost,
} from "./request";

const postSlice = createSlice({
    name: "post",
    initialState: {
        singlePost: null,
        feedPost: [],
        postStatus: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: {
        [newPost.pending]: (state) => {
            state.postStatus = "loading";
        },
        [newPost.fulfilled]: (state, action) => {
            state.postStatus = "posted";
        },
        [newPost.rejected]: (state, action) => {
            state.postStatus = "newPostError";
            state.error = action.payload;
        },
        [getFeed.pending]: (state) => {
            state.postStatus = "pending";
        },
        [getFeed.fulfilled]: (state, action) => {
            state.feedPost = action.payload.feed;
            state.postStatus = "receivedFeed";
        },
        [getFeed.rejected]: (state, action) => {
            state.postStatus = "feedError";
            state.error = action.payload;
        },
        [likePost.pending]: (state) => {
            state.postStatus = "linkingPost";
        },
        [likePost.fulfilled]: (state, action) => {
            const { success, postId, likes } = action.payload;
            if (success) {
                state.feedPost = state.feedPost.map((post) => {
                    if (post._id === postId) {
                        post.likes = likes;
                    }
                    return post;
                });
            }
            state.postStatus = "likedPost";
        },
        [likePost.rejected]: (state, action) => {
            state.postStatus = "likeError";
            state.error = action.payload;
        },
        [removeLikePost.pending]: (state) => {
            state.postStatus = "removingLikeOnPost";
        },
        [removeLikePost.fulfilled]: (state, action) => {
            const { success, postId, likes } = action.payload;

            if (success) {
                state.feedPost = state.feedPost.map((post) => {
                    if (post._id === postId) {
                        post.likes = likes;
                    }
                    return post;
                });
            }
            state.postStatus = "removedLinkFromPost";
        },
        [commentPost.rejected]: (state, action) => {
            state.postStatus = "addCommentError";
            state.error = action.payload;
        },
        [commentPost.pending]: (state) => {
            state.postStatus = "commentPostPending";
        },
        [commentPost.fulfilled]: (state, action) => {
            const { success, postId, comment } = action.payload;
            if (success) {
                state.feedPost = state.feedPost.map((post) => {
                    if (post._id === postId) {
                        post.comment = comment;
                    }
                    return post;
                });
            }
            state.postStatus = "commentAddedPost";
        },
        [getSinglePost.pending]: (state, action) => {
            state.postStatus = "singlePostPending";
            state.error = action.payload;
        },
        [getSinglePost.rejected]: (state, action) => {
            state.postStatus = "getSinglePostError";
            state.error = action.payload;
        },
        [getSinglePost.fulfilled]: (state, action) => {
            const { success, post } = action.payload;
            if (success) {
                state.singlePost = post;
            }
            state.postStatus = "receivedSingPost";
        },
    },
});

export default postSlice.reducer;
export const {} = postSlice.actions;

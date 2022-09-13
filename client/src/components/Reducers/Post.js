import {createReducer} from '@reduxjs/toolkit';
const initialState = {};

export const postReducer = createReducer(initialState, {
    //new post
    NewPostRequest: (state)=>{
        state.loading = true;
    },
    NewPostSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    NewPostFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },


    //user post
    UserPostRequest: (state)=>{
        state.loading = true;
    },
    UserPostSuccess: (state, action)=>{
        state.loading = false;
        state.posts = action.payload;
    },
    UserPostFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },


    //Following post
    MyPostRequest: (state)=>{
        state.loading = true;
    },
    MyPostSuccess: (state, action)=>{
        state.loading = false;
        state.posts = action.payload;
    },
    MyPostFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    //update post
    UpdatePostRequest: (state)=>{
        state.loading = true;
    },
    UpdatePostSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    UpdatePostFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    

    //get post by id
    SinglePostRequest: (state)=>{
        state.loading = true;
    },
    SinglePostSuccess: (state, action)=>{
        state.loading = false;
        state.post = action.payload;
    },
    SinglePostFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },


    //like post
    LikeRequest: (state)=>{
        state.loading = true;
    },
    LikeSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    LikeFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    

    //comment post
    CommentRequest: (state)=>{
        state.loading = true;
    },
    CommentSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    CommentFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    

    //delete comment post
    DeleteCommentRequest: (state)=>{
        state.loading = true;
    },
    DeleteCommentSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    DeleteCommentFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    //delete post
    DeleteRequest: (state)=>{
        state.loading = true;
    },
    DeleteSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    DeleteFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    

    //Following post
    FollowingPostRequest: (state)=>{
        state.loading = true;
    },
    FollowingPostSuccess: (state, action)=>{
        state.loading = false;
        state.posts = action.payload;
    },
    FollowingPostFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },


    //clear Erros
    ClearErrors: (state)=>{
        state.error = null;
    },

    //clear Messages
    ClearMessages: (state)=>{
        state.message = null;
    }
})
import axios from "axios";

//create post
export const newPost = (image, caption)=>async(dispatch)=>{
    try {

        dispatch({
            type: "NewPostRequest"
        })

        const {data} = await axios.post(`/new`, {
            image, caption
        }, {
            headers:{
                "Content-Type": "application/json"
            }
        })

        dispatch({
            type: "NewPostSuccess",
            payload: data.message
        })
        
    } catch (error) {
        dispatch({
            type: "NewPostFailure",
            payload: error.response.data.message
        })        
    }
}


//get my post
export const getMyPosts = ()=>async(dispatch)=>{
    try {

        dispatch({
            type: "MyPostRequest"
        })

        const { data } = await axios.get(`/me/posts`);

        dispatch({
            type: "MyPostSuccess",
            payload: data.posts
        })
        
    } catch (error) {
        dispatch({
            type: "MyPostFailure",
            payload: error.response.data.message
        })        
    }
}


//get single post
export const getSinglePost = (id)=>async(dispatch)=>{
    try {

        dispatch({
            type: "SinglePostRequest"
        })

        const { data } = await axios.get(`/post/update/${id}`);

        dispatch({
            type: "SinglePostSuccess",
            payload: data.post
        })
        
    } catch (error) {
        dispatch({
            type: "SinglePostFailure",
            payload: error.response.data.message
        })        
    }
}

//update post
export const updatePost = (id, newCaption)=>async(dispatch)=>{
    try {

        dispatch({
            type: "UpdatePostRequest"
        })

        const { data } = await axios.put(`/post/${id}`, {newCaption});

        dispatch({
            type: "UpdatePostSuccess",
            payload: data.message
        })
        
    } catch (error) {
        dispatch({
            type: "UpdatePostFailure",
            payload: error.response.data.message
        })        
    }
}

//get user post
export const getUserPost = (id)=>async(dispatch)=>{
    try {

        dispatch({
            type: "UserPostRequest"
        })

        const { data } = await axios.get(`/users/${id}/posts`);

        dispatch({
            type: "UserPostSuccess",
            payload: data.posts
        })
        
    } catch (error) {
        dispatch({
            type: "UserPostFailure",
            payload: error.response.data.message
        })        
    }
}


//get following post
export const getFollowingPosts = () => async (dispatch) => {
    try {

        dispatch({
            type: " FollowingPostRequest"
        })

        const { data } = await axios.get(`/posts`);

        dispatch({
            type: "FollowingPostSuccess",
            payload: data.posts
        })

    } catch (error) {
        dispatch({
            type: "FollowingPostFailure",
            payload: error.response.data.message
        })
    }
}


//delete post
export const deletePost = (id)=>async(dispatch)=>{
    try {

        dispatch({
            type: "DeleteRequest"
        })

        const {data} = await axios.delete(`/post/${id}`);

        dispatch({
            type: "DeleteSuccess",
            payload: data.message
        })
        
    } catch (error) {
        dispatch({
            type: "DeleteFailure",
            payload: error.response.data.message
        })        
    }
}

//like post
export const likePost = (id)=>async(dispatch)=>{
    try {

        dispatch({
            type: "LikeRequest"
        })

        const {data} = await axios.get(`/post/${id}`);

        dispatch({
            type: "LikeSuccess",
            payload: data.message
        })
        
    } catch (error) {
        dispatch({
            type: "LikeFailure",
            payload: error.response.data.message
        })        
    }
}


//comment post
export const commentPost = (id, comment)=>async(dispatch)=>{
    try {

        dispatch({
            type: "CommentRequest"
        })

        const {data} = await axios.put(`/post/comment/${id}`, {comment});

        dispatch({
            type: "CommentSuccess",
            payload: data.message
        })
        
    } catch (error) {
        dispatch({
            type: "CommentFailure",
            payload: error.response.data.message
        })        
    }
}

//comment post
export const deleteComment = (id)=>async(dispatch)=>{
    try {

        dispatch({
            type: "DeleteCommentRequest"
        })

        const {data} = await axios.delete(`/post/comment/${id}`);

        dispatch({
            type: "DeleteCommentSuccess",
            payload: data.message
        })
        
    } catch (error) {
        dispatch({
            type: "DeleteCommentFailure",
            payload: error.response.data.message
        })        
    }
}
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Form from 'react-bootstrap/Form';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {likePost, getFollowingPosts, getMyPosts, getUserPost, commentPost, deletePost, deleteComment} from "../Actions/Post";
import { NavLink, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { loadUser } from '../Actions/User';


const Post = ({
    postId,
    caption,
    image,
    owner,
    likes=[],
    comments=[],
    isHome,
    isMyAccount,
    isSingleUser,
})=>{

    const params = useParams();
    const [like, setLike] = useState(false);
    const [isMyComment, setIsMyComment] = useState(false);
    const [comment, setComment] = useState();
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.user);

    const handleDelete = async()=>{
        await dispatch(deletePost(postId));
        await dispatch(getMyPosts());
        dispatch(loadUser());
    }

    const handleLike = async(e)=>{
        setLike(!like);
        await dispatch(likePost(postId));

        if(isMyAccount){
            dispatch(getMyPosts());
        }
        else if(isSingleUser){
            dispatch(getUserPost(params.id));
        }
        else{
            dispatch(getFollowingPosts());
        }
    }

    const handleDeleteComment = async()=>{
        await dispatch(deleteComment(postId));

        if (isMyAccount) {
            dispatch(getMyPosts());
        }
        else if (isSingleUser) {
            dispatch(getUserPost(params.id));
        }
        else {
            dispatch(getFollowingPosts());
        }
    }

    const handleComment = async(e)=>{
        await dispatch(commentPost(postId, comment));

        if (isMyAccount) {
            dispatch(getMyPosts());
        }
        else if (isSingleUser) {
            dispatch(getUserPost(params.id));
        }
        else {
            dispatch(getFollowingPosts());
        }
    }

    useEffect(()=>{
        likes.forEach((item)=>{
            if(item._id === user._id){
                setLike(true);
            }
            else{
                setLike(false);
            }
        })
        comments.forEach((item)=>{
            if(item.user._id === user._id){
                setIsMyComment(true);
            }
            else{
                setIsMyComment(false);
            }
        })
    }, [user._id, likes, comments]);

    return(
        <Card >
            {
                isHome ?
                <>
                    <NavLink to={`/users/${owner._id}`} className="link user d-flex align-items-center">
                        <img src={owner.avatar.url} alt="" />
                        <h4>{owner.name}</h4>
                    </NavLink>
                    <hr />
                </>
                : null
            }
            <Card.Text className="d-flex align-items-center justify-content-around">
                {caption}

                {   isMyAccount ?
                    <NavLink className="link" to={`/post/update/${postId}`}>
                        <AddPhotoAlternateIcon className="icon" /> 
                    </NavLink>
                    : null
                }
            </Card.Text>
            
            <hr />
            <img className="post-img" src={image.url} alt="post_image" />
            <hr />
            <span className="d-flex align-items-center justify-content-around">

                {['top'].map((placement) => (
                    <OverlayTrigger
                        trigger="click"
                        key={placement}
                        placement={placement}
                        overlay={
                            <Popover id={`popover-positioned-${placement}`}>
                                <Popover.Header as="h3">Users who Liked..</Popover.Header>
                                <Popover.Body>
                                    {
                                        likes.length > 0 ? likes.map((item)=>(
                                            <NavLink key={item._id} to={`/users/${item._id}`} className="link users user d-flex align-items-center">
                                                <img src={item.avatar.url} alt="" />
                                                <h4>{item.name}</h4>
                                            </NavLink>
                                        ))
                                        : "No Likes yet !!"
                                    }
                                </Popover.Body>
                            </Popover>
                        }
                    >
                        <button className="bg-transparent border-0 text-primary">{likes.length} Likes</button>
                    </OverlayTrigger>
                ))}

                <button style={{cursor: "text"}} className="bg-transparent border-0 text-primary text-muted">{comments.length} Comments</button>

            </span>
            <hr />
            <div className="d-flex justify-content-around">
                {like ?
                    <FavoriteIcon onClick={handleLike} className="icon" />
                    :
                    <FavoriteBorderIcon onClick={handleLike}  className="icon" />
                }

                {['top'].map((placement) => (
                    <OverlayTrigger
                        trigger="click"
                        key={placement}
                        placement={placement}
                        overlay={
                            <Popover style={{background: "aliceblue"}} id={`popover-positioned-${placement}`}>
                                <span className="d-flex align-items-center justify-content-around m-1">
                                    <Form.Control type="text" value={comment} onChange={(e)=>{setComment(e.target.value)}}  placeholder="Write your comment.." required />
                                    <Button disabled={!comment} onClick={handleComment} className="w-25" variant="outline-info">Add</Button>
                                </span>

                                <Popover.Header as="h3">Users who Commented..</Popover.Header>
                                <Popover.Body>
                                    {
                                        comments.length > 0 ? comments.map((item)=>(
                                            <div key={item._id} className="bg-light p-1">
                                                <NavLink to={`/users/${item.user._id}`} className="link user d-flex align-items-center">
                                                    <img src={item.user.avatar.url} alt="" />
                                                    <h4>{item.user.name}</h4>
                                                </NavLink>
                                                <span className="d-flex align-items-center justify-content-center my-1">
                                                    {item.comment}
                                                    {
                                                        isMyComment ? <DeleteForeverIcon onClick={handleDeleteComment} className="icon fs-5 ms-1" /> : null
                                                    }
                                                </span>
                                                <hr />
                                            </div>
                                        )) : "No comments yet !!"
                                    }
                                </Popover.Body>
                            </Popover>
                        }
                    >
                        <AddCommentIcon className="icon" />
                    </OverlayTrigger>
                ))}

                {
                    isMyAccount ? <DeleteForeverIcon onClick={handleDelete} className="icon" /> : null
                }

            </div>

        </Card>
    );
}

export default Post;
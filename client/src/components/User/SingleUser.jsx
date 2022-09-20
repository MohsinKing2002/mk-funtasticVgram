import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink, useParams} from 'react-router-dom';
import { followUser, getSingleUser } from '../Actions/User';
import { getUserPost } from '../Actions/Post';
import Loader from '../Util/Loader';
import Post from '../Post/Post';


function SingleUser() {
    const [follow, setFollow] = useState();

    const params = useParams();
    const dispatch = useDispatch();
    const {user:me} = useSelector(state=>state.user);
    const { user, loading, error, message } = useSelector(state => state.singleUser);
    
    const { posts, loading:postLoading, error:postError } = useSelector(state => state.post);
    
    const handleFollow = async(e)=>{
        await dispatch(followUser(params.id));
        setFollow(!follow)
    }

    useEffect(()=>{
        dispatch(getSingleUser(params.id));
        dispatch(getUserPost(params.id));

    }, [params.id, dispatch]);

    useEffect(()=>{
        //checking if already followed
        if (user) {
            user.followers.forEach((item) => {
                if (item._id === me._id) {
                    setFollow(true);
                }
                else {
                    setFollow(false);
                }
            })
        }
    }, [user, me._id]);

    useEffect(()=>{
        if(error){
            alert(error);
            dispatch({
                type: "ClearErrors"
            })
        }
        if(postError){
            alert(postError);
            dispatch({
                type: "ClearErrors"
            })
        }
        if(message){
            dispatch({
                type: "ClearMessages"
            })
        }
    }, [dispatch, error, postError, message]);

    return loading === true || postLoading === true ? <Loader/> : (
        <div className="home_page">
            <Col sm={5} className="mobile-users rounded bg-light styled-bar d-flex justify-content-center h-100 overflow-auto">
                <div className="profile ">
                    <img style={{ height: "25vh", borderRadius: "150px", marginBottom: "20px" }} src={user && user.avatar.url} alt="avatar" />

                    <div className="user d-flex align-items-center my-2">
                        <AccountCircleIcon className='icon' />
                        <h4>{user && user.name}</h4>
                    </div>
                    <div style={{lineBreak: "anywhere"}} className="user d-flex align-items-center my-2">
                        <EmailIcon className="icon" />
                        <h4>{user && user.email}</h4>
                    </div>

                    {['top'].map((placement) => (
                        <OverlayTrigger
                            trigger="click"
                            key={placement}
                            placement={placement}
                            overlay={
                                <Popover id={`popover-positioned-${placement}`}>
                                    <Popover.Header as="h3">Followings..</Popover.Header>
                                    <Popover.Body>
                                        {
                                            user && user.followings && user.followings.length > 0 ? user.followings.map((item) => (
                                                <NavLink key={item._id} to={`/users/${item._id}`} className="link users user d-flex align-items-center">
                                                    <img src={item.avatar.url} alt="" />
                                                    <h4>{item.name}</h4>
                                                </NavLink>
                                            )) : "No Followings yet !!"
                                        }
                                    </Popover.Body>
                                </Popover>
                            }
                        >
                            <div style={{ cursor: "pointer" }} className="user d-flex align-items-center my-2">
                                <FavoriteBorderIcon className="icon" />
                                <h4>{user && user.followings.length} Followings</h4>
                            </div>
                        </OverlayTrigger>
                    ))}

                    {['top'].map((placement) => (
                        <OverlayTrigger
                            trigger="click"
                            key={placement}
                            placement={placement}
                            overlay={
                                <Popover id={`popover-positioned-${placement}`}>
                                    <Popover.Header as="h3">Followers..</Popover.Header>
                                    <Popover.Body>
                                        {
                                            user && user.followers && user.followers.length > 0 ? user.followers.map((item) => (
                                                <NavLink key={item._id} to={`/users/${item._id}`} className="link users user d-flex align-items-center">
                                                    <img src={item.avatar.url} alt="" />
                                                    <h4>{item.name}</h4>
                                                </NavLink>
                                            ))
                                                : "No followers yet !!"
                                        }
                                    </Popover.Body>
                                </Popover>
                            }
                        >
                            <div style={{ cursor: "pointer" }} className="user d-flex align-items-center my-2">
                                <FavoriteIcon className="icon" />
                                <h4>{user && user.followers.length} Followers</h4>
                            </div>
                        </OverlayTrigger>
                    ))}

                    <div className="user d-flex align-items-center my-2">
                        <StickyNote2Icon className="icon" />
                        <h4>{user && user.posts.length} Posts</h4>
                    </div>

                    <br />

                    {
                        me && params.id && me._id === params.id ? null :
                        <Button onClick={handleFollow} variant={follow ? "danger" : "primary"}>{follow ? "Unfollow" : "Follow"} User</Button>
                    }
                </div>
            </Col>

            <Col sm={7} className="styled-bar h-100 overflow-auto text-center">
                {
                    posts && posts.length > 0 ? posts.map((item) => (
                        <Post
                            key={item._id}
                            postId={item._id}
                            image={item.image}
                            caption={item.caption}
                            likes={item.likes}
                            comments={item.comments}
                            isSingleUser={true}
                            isHome={false}
                            isMyAccount={false}
                        />
                    ))
                        : <h6>No Posts yet !!</h6>
                }
            </Col>
        </div>
    );
}

export default SingleUser;
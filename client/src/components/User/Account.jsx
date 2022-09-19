import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { loadUser, logoutUser } from '../Actions/User';
import { NavLink } from 'react-router-dom';
import { getMyPosts } from '../Actions/Post';
import Loader from "../Util/Loader";
import Post from '../Post/Post';


function Account() {
    const dispatch = useDispatch();
    const {user, loading, error} = useSelector(state=>state.user);
    const {posts, loading:postLoading, error:postError} = useSelector(state=>state.post);

    useEffect(()=>{
        dispatch(loadUser());
        dispatch(getMyPosts());
    }, [dispatch]);

    const handleLogout =()=>{
        dispatch(logoutUser());
    }

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
    }, [dispatch, error, postError]);

    return loading === true || postLoading === true ? <Loader/> : (
        <div className="home_page">
            <Col sm={5} className="rounded  bg-light styled-bar d-flex justify-content-center h-100 overflow-auto">
                    <div className="profile">
                    <img style={{ height: "25vh", borderRadius: "150px", marginBottom: "20px" }} src={user && user.avatar.url} alt="avatar" />

                        <div className="user d-flex align-items-center my-2">
                            <AccountCircleIcon className='icon'/>
                            <h4>{user && user.name}</h4>
                        </div>
                        <div className="user d-flex align-items-center my-2">
                            <EmailIcon className="icon"/>
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
                                                user.followings && user.followings.length > 0 ? user.followings.map((item) => (
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
                                    <FavoriteIcon className="icon" />
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
                                                user.followers && user.followers.length > 0 ? user.followers.map((item) => (
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
                                <div style={{cursor: "pointer"}} className="user d-flex align-items-center my-2">
                                    <FavoriteBorderIcon className="icon" />
                                    <h4>{user && user.followers.length} Followers</h4>
                                </div>
                            </OverlayTrigger>
                        ))}

                        <div className="user d-flex align-items-center my-2">
                            <StickyNote2Icon className="icon" />
                            <h4>{user && user.posts.length} Posts</h4>
                        </div>

                        <br />
                        <Button variant="outline-info">
                            <NavLink className="link text-primary" to="/me/update"> Edit Profile</NavLink>
                        </Button>{' '}

                        <Button onClick={handleLogout} variant="outline-warning">Log out</Button>{' '}

                         <Button variant="danger">
                            <NavLink className="link text-light" to="/me/delete"> Delete Profile</NavLink>
                        </Button>{' '}
                    </div>
                </Col>

                <Col sm={7} className="styled-bar h-100 overflow-auto text-center">
                   {
                    user && posts && posts.length > 0 ? posts.map((item)=>(
                        <Post 
                            key={item._id}
                            time={item.time}
                            postId={item._id}
                            image={item.image}
                            caption={item.caption}
                            likes={item.likes}
                            comments={item.comments}
                            isMyAccount={true}
                            isHome={false}
                        />
                    ))
                        : <h6>No Posts yet !!</h6>
                   }
                </Col>
        </div>
    );
}

export default Account;
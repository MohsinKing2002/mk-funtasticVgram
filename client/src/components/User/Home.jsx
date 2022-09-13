import Col from 'react-bootstrap/Col';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import { useEffect } from 'react';
import { getAllUsers } from '../Actions/User';
import { getFollowingPosts } from '../Actions/Post';
import Loader from '../Util/Loader';
import Post from '../Post/Post';

function Home() {
    const dispatch = useDispatch();
    const {users, error, loading} = useSelector(state=>state.user);
    const {posts, error:postError, loading:postLoading, message} = useSelector(state=>state.post);

    useEffect(()=>{
        dispatch(getAllUsers());
        dispatch(getFollowingPosts());
    }, [dispatch]);

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
                <Col sm={4} className="rounded styled-bar h-100 bg-light px-1 overflow-auto">
                    <h3 className="title">users you may know..</h3> <hr />  
                    {
                        users && users.map((item)=>(
                            <NavLink key={item._id} to={`/users/${item._id}`} className="users link user d-flex align-items-center my-2">
                                <img src={item.avatar.url} alt="" />
                                <h4>{item.name}</h4>
                            </NavLink>
                        ))
                    }                  

                </Col>

                <Col sm={8} className="rounded styled-bar h-100 overflow-auto text-center">

                    {
                    posts && posts.length > 0 ? posts.map((item)=>(
                        <Post key={item._id}
                            postId={item._id} 
                            caption={item.caption}
                            image={item.image} 
                            owner={item.owner}   
                            likes={item.likes}                       
                            comments={item.comments} 
                            isHome={true} 
                            isMyAccount={false}             
                        />
                    )) : <h6>No Posts yet !!</h6>
                        
                    } 
                </Col>
        </div>
    );
}

export default Home;
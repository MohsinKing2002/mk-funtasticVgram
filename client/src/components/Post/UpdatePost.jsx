import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { getSinglePost, updatePost } from '../Actions/Post';
import Loader from '../Util/Loader';

function UpdatePost() {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {post, loading, message, error} = useSelector(state=>state.post);
    const [newCaption, setCaption] = useState(); 

    const handlePostUpdate = (e)=>{
        e.preventDefault();

        dispatch(updatePost(params.id, newCaption));
    }

    useEffect(()=>{
        dispatch(getSinglePost(params.id));
    }, [dispatch, params.id]);

    useEffect(()=>{
        if(message){
            navigate("/account");
            dispatch({
                type: "ClearMessages"
            })
        }
        if(error){
            alert(error);
            dispatch({
                type: "ClearErrors"
            })
        }
    }, [dispatch, message, error]);

    return loading ? <Loader /> : (
        <Card className="text-center mobile-card">
            <Card.Header>
                <NavLink className="logo link" to="/">
                    <img src="https://thumbs.dreamstime.com/b/print-204010516.jpg" alt="" />
                    <i>funstasticVgram</i>
                </NavLink>
            </Card.Header>
            <Card.Body>
                <Card.Title>Update Post</Card.Title>

                <img style={{ margin: "15px 0", height: "25vh", borderRadius: "8px"}} src={post && post.image.url} alt="preview" />
                <Form onSubmit={handlePostUpdate}>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Control type="text" value={newCaption} onChange={(e)=>{setCaption(e.target.value)}} defaultValue={post && post.caption}  placeholder="Update Caption.." required />
                    </Form.Group>

                    <Button disabled={loading} type="submit" variant="primary">Update</Button>
                </Form>
            </Card.Body>
            <Card.Footer className="text-muted">
                You're not allowed to change the picture !!! 
                Update the Caption only.....
            </Card.Footer>
        </Card>
    );
}

export default UpdatePost;
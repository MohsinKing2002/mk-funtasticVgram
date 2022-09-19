import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { deleteUser, loadUser } from '../Actions/User';

function DeleteUser() {
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const {message, loading, error} = useSelector(state=>state.user);

     const handleDelete = async(e)=>{
        e.preventDefault();

        await dispatch(deleteUser(password));
        dispatch(loadUser());
    }

    useEffect(()=>{
        if(error){
            alert(error);
            dispatch({
                type: "ClearErrors"
            })
        }
        if(message){
            alert(message);
            dispatch({
                type: "ClearMessages"
            })
        }
    }, [dispatch, error, message]);

    return (
        <Card className="text-center mobile-card">
            <Card.Header>
                <NavLink className="logo link" to="/">
                    <img src="https://thumbs.dreamstime.com/b/print-204010516.jpg" alt="" />
                    <i>funstasticVgram</i>
                </NavLink>
            </Card.Header>
            <br />
            <Card.Title>Action can't be undone.. </Card.Title> 
            <Card.Body>
                <Form onSubmit={handleDelete}>
                    <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Control value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password"  placeholder="Enter Your Password" required />
                    </Form.Group>
                    <Button disabled={loading} type="submit" variant="danger">Delete Profile</Button>
                </Form>
            </Card.Body>
            <Card.Footer className="text-muted">
                <NavLink className="link" to="/account">
                    No !! Go Back..
                </NavLink>
            </Card.Footer>
        </Card>
    );
}

export default DeleteUser;
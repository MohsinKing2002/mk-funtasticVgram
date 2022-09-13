import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import {NavLink, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';
import { loginUser } from '../Actions/User';
import { useEffect } from 'react';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {loading, error, message} = useSelector(state=>state.user);

    const [user, setUser] = useState({
        email: "", password: ""
    });
    let name, value;
    const handleInputs = (e)=>{
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value});
    }

    const handleLogin = (e)=>{
        e.preventDefault();
        
        dispatch(loginUser(user.email, user.password));
    }

    useEffect(()=>{
        if(error){
            alert(error);
            dispatch({
                type: "ClearErrors"
            })
        }
        if(message){
            navigate("/");
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
            <Card.Body>
                <Card.Title>Sign in</Card.Title>
                <br />
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Control name="email" type="email" value={user.email} onChange={handleInputs} placeholder="Enter Your Email" required />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Control name="password" type="password" value={user.password} onChange={handleInputs} placeholder="Enter Your Password" required />
                    </Form.Group>
                    <Button disabled={loading} type="submit" variant="primary">{loading ? "Loggin in.." : "Log in"}</Button>
                </Form>
            </Card.Body>
            <Card.Footer className="text-muted">
                <NavLink className="link" to="/register">
                    Don't have account? Register now..
                </NavLink>
            </Card.Footer>
        </Card>
    );
}

export default Login;
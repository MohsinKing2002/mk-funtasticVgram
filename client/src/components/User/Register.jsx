import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { NavLink , useNavigate} from 'react-router-dom';
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { registerUser } from '../Actions/User';
import { useEffect } from 'react';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {loading, error, message} = useSelector(state=>state.user);
    
    const [image, setImage] = useState();
    const [user, setUser] = useState({
        name: "", email: "", password: ""
    })
    let name, value;
    const handleInputs = (e)=>{
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value});
    }

    const handleImage = (e) => {
        const file = e.target.files[0];
        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setImage(Reader.result);
            }
        }
    }

    const handleRegister = (e)=>{
        e.preventDefault();

        dispatch(registerUser(user.name, user.email, user.password, image));
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
                <Card.Title>Sign up</Card.Title>
                <br />
                <Form onSubmit={handleRegister}>
                    {
                        image ? <img style={{height: "8vh", borderRadius: "15px", marginBottom: "20px"}} src={image} alt="post_prev" /> : null
                    }
                    <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Control onChange={handleImage} type="file" accept="image/*" required />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Control name="name" type="text" value={user.name} onChange={handleInputs} placeholder="Enter Your Name" required />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Control name="email" type="email" value={user.email} onChange={handleInputs} placeholder="Enter Your Email" required />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Control name="password" type="password" value={user.password} onChange={handleInputs} placeholder="Enter Your Password" required />
                    </Form.Group>
                    
                    <Button disabled={loading} type="submit" variant="primary">{loading ? "Registering..":"Register"}</Button>
                </Form>
            </Card.Body>
            <Card.Footer className="text-muted">
                <NavLink className="link" to="/">
                    Already have a account? Login..
                </NavLink>
            </Card.Footer>
        </Card>
    );
}

export default Register;
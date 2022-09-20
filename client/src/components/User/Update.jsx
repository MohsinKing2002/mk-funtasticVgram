import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { updateProfile } from '../Actions/User';

function Update() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading, error, message} = useSelector(state=>state.user);

    const [avatar, setAvatar] = useState();
    const [user, setUser] = useState({
        name: "", email: "", password: "", confirmPassword: ""
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
                setAvatar(Reader.result);
            }
        }
    }

    const handleUpdate = (e)=>{
        e.preventDefault();

        if(user.password){
            if(user.password === user.confirmPassword)
                dispatch(updateProfile(user.name, user.email, user.password, avatar));
            else
                alert("Passwords are not matching..");
        }
        else{
            dispatch(updateProfile(user.name, user.email, user.password, avatar));
        }
    }

    useEffect(()=>{
        if(error){
            alert(error);
            dispatch({
                type: "ClearErrors"
            })
        }
        if(message){
            navigate("/account");
            dispatch({
                type: "ClearMessages"
            })
        }
    }, [dispatch, error, message, navigate]);

    return (
        <Card className="text-center mobile-card">
            <Card.Header>
                <NavLink className="logo link" to="/">
                    <img src="https://thumbs.dreamstime.com/b/print-204010516.jpg" alt="" />
                    <i>funstasticVgram</i>
                </NavLink>
            </Card.Header>
            <Card.Body>
                <Card.Title>Edit Profile</Card.Title>
                <br />
                <Form onSubmit={handleUpdate}>
                    {
                        avatar ? <img style={{height: "8vh", borderRadius: "15px", marginBottom: "20px"}} src={avatar} alt="post_prev" /> : null
                    }
                    <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Control onChange={handleImage} type="file" accept="image/*" />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Control name="name" type="text" value={user.name} onChange={handleInputs} placeholder="Enter Your Name" />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Control name="email" type="email" value={user.email} onChange={handleInputs} placeholder="Enter Your Email" />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Control name="password" type="password" value={user.password} onChange={handleInputs} placeholder="Enter New Password" />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Control name="confirmPassword" type="password" value={user.confirmPassword} onChange={handleInputs} placeholder="* Confirm Your Password" />
                    </Form.Group>

                    <Button disabled={loading} type="submit" variant="primary"> {loading ? "Updating.." : "Update"} </Button>
                </Form>
            </Card.Body>
            <Card.Footer className="text-muted">
                <NavLink className="link" to="/account">
                    Back to account !!
                </NavLink>
            </Card.Footer>
        </Card>
    );
}

export default Update;
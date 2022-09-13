import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllUsers } from '../Actions/User';

function Search() {

    const dispatch = useDispatch();
    const {users, loading, error} = useSelector(state=>state.user);
    const [name, setName] = useState();

    const handleFind = (e)=>{
        e.preventDefault();

        dispatch(getAllUsers(name));
    }

    useEffect(()=>{
        if(error){
            alert(error);
            dispatch({
                type: "ClearErrors"
            })
        }
    }, [dispatch, error]);

    return (
        <Card className="text-center mobile-card">
            <Card.Header>
                <NavLink className="logo link" to="/">
                    <img src="https://thumbs.dreamstime.com/b/print-204010516.jpg" alt="" />
                    <i>funstasticVgram</i>
                </NavLink>
            </Card.Header>
            <Card.Body>
                <Card.Title>Search Users</Card.Title>
                <br />
                <Form onSubmit={handleFind}>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Control name="name" value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Enter User Name" required />
                    </Form.Group>

                    <Button disabled={loading} type="submit" variant="primary">{loading ? "Finding.." : "Find"} Users</Button>
                </Form>
            </Card.Body>
            <Card.Footer className="text-muted">
                {
                    users && users.length > 0 ? users.map((item)=>(
                        <NavLink key={item._id} to={`/users/${item._id}`} className="link users user d-flex align-items-center">
                            <img src={item.avatar.url} alt="" />
                            <h4>{item.name}</h4>
                        </NavLink>
                    ))
                    : "No Users Found !!"
                }
            </Card.Footer>
        </Card>
    );
}

export default Search;
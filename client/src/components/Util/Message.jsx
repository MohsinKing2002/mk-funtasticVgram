import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import TelegramIcon from '@mui/icons-material/Telegram';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

//socket
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
const socket = io.connect("/");



function ResponsiveAutoExample() {

    const [name, setName] = useState();
    const [room, setRoom] = useState("123");
    const [chat, setChat] = useState("");
    const [Data, setData] = useState([]);
    const [show, setShow] = useState(false);

    const joinRoom = ()=>{
        if(name !== "" && room !== ""){
            socket.emit("join_room", room);
            setShow(true);
        }
    }

    const scrollAuto = ()=>{
        let messageArea = document.querySelector(".message_box");
        if(messageArea){
            messageArea.scrollTop = messageArea.scrollHeight;
        }
    }

    const sendMessage = async()=>{
        if(chat !== ""){
            const chatData = {
                room: room,
                author: name,
                message: chat
            }

            await socket.emit("send_message", chatData);
            setData((list) => [...list, chatData]);
            scrollAuto();
        }
        setChat("");
    }

    useEffect(()=>{
        socket.on("receive_message", (data)=>{
            setData((list)=>[...list, data]);
        })
        scrollAuto();
    }, [socket]);

    return (
        <Card className="text-center message">
            <Card.Header>
                <div className="logo" to="/">
                    <img src="https://thumbs.dreamstime.com/b/print-204010516.jpg" alt="" />
                    <i>funstasticVgram</i>
                </div>
            </Card.Header>
            <Card.Body>
                {
                    show ? 
                    <Card.Title className="animate-live text-danger d-flex align-items-center justify-content-center"> 
                        <RadioButtonCheckedIcon className="text-danger icon me-2" />
                        Live Chat
                    </Card.Title> : null
                }
                <hr />

                {
                    !show ?
                        <div>
                            <Form.Control style={{ margin: "18px 0" }} type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Enter user name" required/>
                            <Form.Control style={{ margin: "18px 0" }} type="text" value={room} onChange={(e) => { setRoom(e.target.value) }} placeholder="Enter room id" requ/>
                            <Button disabled={!name || !room} className="mt-3" variant="info" onClick={joinRoom}>Join Chat</Button>
                        </div>   
                    :
                        <Card.Text>
                            <div className="border border-info message_box p-2 rounded overflow-auto styled-bar">
                                {
                                    Data.map((item)=>(
                                        <div key={item._id} id={name===item.author ? "end": "start"}  className="w-100  mt-1 mb-3 message-content">
                                            <h4 id={name === item.author ? "me": "other"} >{item.author}</h4>
                                            <h5>{item.message}</h5>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="d-flex align-items-center my-1">
                                <Form.Control type="text"
                                    value={chat}
                                    onChange={(e) => { setChat(e.target.value) }} 
                                    onKeyPress={(e)=>{e.key === "Enter" && sendMessage();}}
                                    placeholder="write your message.." 
                                required />
                                <TelegramIcon onClick={sendMessage} className="message_icon ms-2 bg-dark text-info border border-info p-1 rounded" />
                            </div>
                        </Card.Text>
                }

            </Card.Body>
            {
                !show ? (
                <Card.Footer className="text-muted">
                    Use Default Room Id 123 <br />
                    Or Create a new one with your friends..
                </Card.Footer>
            ) : (
                <Card.Footer className="text-muted">
                    Your chats are not parmanent !! <br />
                    You can leave anytime.. (by reloding..)
            </Card.Footer>
            )
            }
        </Card>
    );
}

export default ResponsiveAutoExample;
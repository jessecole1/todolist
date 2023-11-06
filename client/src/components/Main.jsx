import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Display from './Display';
import '../App.css';

const Main = () => {

    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    // GETTING USER'S TODO DATA
    useEffect(() => {
        axios.get("http://localhost:8000/api/todos")
        .then(res => {
            console.log("RES: " + res.data.todo);
            let arr = [];
            for (let i = 0; i < res.data.todo.length; i++) {
                console.log(i);
                arr.push(res.data.todo[i]);
            }
            setMessageList(arr);
        })
        .catch(err => {
            console.log(err);
            console.log("failedddddd");
        })
    }, [message]);


    // CREATING A NEW TODO
    const submitHandler = (e) => {
        if (message.length == 0) {
            return;
        }
        e.preventDefault();
        const item = {
            message: message,
            complete:false
        }
        axios.post("http://localhost:8000/api/todo",{
            message:message,
            complete:false
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

        setMessageList([...messageList, item]);
        setMessage("");
    }



    return (

        <>
            <div className="mainBackground">
                
                <div className="enterWrap">
                    <div className="enterTodoMenu">
                        <input className="enterTodo" onChange = {(e) => setMessage(e.target.value)} value={message}/>
                        <button className="submitButton" onClick = {(e) => {submitHandler(e)}}>Submit</button>
                    </div>
                </div>
            <Display messageList = {messageList} setMessageList  = {setMessageList} message={message} setMessage={setMessage}/>
            </div>

        </>


    );
};

export default Main;

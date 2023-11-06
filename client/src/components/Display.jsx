import React from 'react';
import '../App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Display = (props) => {

    
    const {messageList, setMessageList, message, setMessage} = props;
    const {complete, setComplete} = useState();


    // UPDATING MAIN TODO COMPLETE
    const handleComplete = (todo) => {
        axios.patch('http://localhost:8000/api/todo/' + todo._id, {
            complete: !todo.complete
        })

        const updatedTodos = messageList.map((item, idx) => {
            console.log(todo._id);
            if (item._id === todo._id) {
                item.complete = !item.complete;
            }
            return item;
        })
        setMessageList(updatedTodos);
    }

    const handleRemove = (messageList) => {
        let updatedTodos = [];
        messageList.map((item, idx) => {
            if (item.complete === false) {
                updatedTodos = [...updatedTodos, item];
            }
        })
        setMessageList(updatedTodos);
    }

    return (
        <>
            <div className="listContentMain">
            <h2 className="text-white self-start pl-[10%] text-3xl pb-[5%]">Your List:</h2>
            <table className="todoListTable contentTable">
                <tbody>

                    {
                        messageList.map((item, i) => {

                            const classArr = ["text-white", "text-xl", "p-3"];
                            if (item.complete) {classArr.push("line-through")}

                            return (
                                    <tr className="oneEntry bg-slate-600 h-full">
                                        <td className="bg-slate-100 tdClassButton h-full"><button className="bg-white-600 checkButton h-full border" onClick={() => {handleComplete(item)}}>&#10003;</button></td>
                                        {/* <td><input type="checkBox" onChange = {() => {handleComplete(item._id)}}/></td> */}
                                        <td className={classArr.join(" ")}><Link to={`/todo/${item._id}`}>{item.message}</Link></td>
                                    </tr>
                            )
                        })
                    }

                </tbody>
                </table>
            </div>
            {/* <div>
                <button className="border bg-slate-800 p-3 rounded-xl text-white border-slate-800 deleteButton" onClick = {() => {handleRemove(messageList)}}>Delete</button>
            </div> */}
        </>
    );
};

export default Display;
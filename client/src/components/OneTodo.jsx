import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

const OneTodo = (props) => {

    const [todo, setTodo] = useState({});
    const [message, setMessage] = useState();
    const [subItems, setSubItems] = useState();

    const [newItem, setNewItem] = useState("");

    const {id} = useParams();


    const [arr, setArr] = useState([]);

    const [newArr, setNewArr] = useState();

    const navigate = useNavigate();


    // CREATING A NEW SUB ITEM
    const submitHandler = (e) => {
        if (newItem.length === 0) {
            return;
        }
        e.preventDefault();
        const item = {
            message: newItem,
            complete: false
        }
        axios.put('http://localhost:8000/api/todo/add/' + id, {
            message: message,
            complete: todo.complete,
            subItems: [...todo.subItems, item]
        })
            .then((res) => {
                console.log("Edit Success!");
                setNewItem("");
            })
            .catch(err => {
                console.log(err);
            })
    }


    // HANDLING COMPLETE FOR SUB ITEM
    const handleComplete = (sub) => {

        let updatedSubItems = subItems.map((item, i) => {
            if (item._id === sub._id) {
                item.complete = !item.complete;
            }
            return item;
        })

        axios.patch("http://localhost:8000/api/todo/" + id, {
            subItems: updatedSubItems
        })
        .then(() => {
            console.log("Updated Successfully..");
        })
        .catch((err) => console.log(err));

    }


    // GETTING SUB ITEMS FROM SINGLE MAIN TODO
    useEffect(() => {
        axios.get("http://localhost:8000/api/todo/" + id)
        .then((res) => {
            setTodo(res.data);
            setMessage(res.data.message);
            setSubItems(res.data.subItems);
            setArr(res.data.subItems);
        })
        .catch(err => {
            console.log(err);
        })
    }, [subItems]);


    // DELETING TODO
    const removeTodo = (id) => {
        axios.delete('http://localhost:8000/api/todo/' + id)
            .then((res) => {
                console.log("deleted");
                navigate("/");
                
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <div className="listContentMain bg-slate-900">
                <Link to={"/"}><button className="border bg-slate-800 p-3 mb-4 rounded-xl text-white border-slate-800 deleteButton">Home</button></Link>
                <div className="enterWrap subItemsHead">
                    <div className="enterTodoMenu">
                        <input className="enterTodo" onChange = {(e) => setNewItem(e.target.value)} value={newItem}/>
                        <button className="submitButton" onClick={(e) => submitHandler(e)} >Submit</button>
                    </div>
                </div>
                {/* <Link to={"/"}><button className="border bg-slate-800 p-3 rounded-xl text-white border-slate-800 deleteButton">Home</button></Link> */}
                <h2 className="text-white self-start pl-[10%] text-3xl pb-[5%]">{todo.message}</h2>

                <table className="todoListTable contentTable">
                    <tbody>
                        {
                            arr.map((item, i) => {

                                const classArr = ["text-white", "text-xl", "p-3"];
                                if (item.complete) {classArr.push("line-through")};

                                return (
                                        <tr className="oneEntry bg-slate-600 h-full">
                                            <td className="bg-slate-100 tdClassButton h-full"><button className="bg-white-600 checkButton h-full border" onClick={() => handleComplete(item)}>&#10003;</button></td>
                                            <td key={i} className={classArr.join(" ")}><span className={classArr.join(" ")}>{item.message}</span></td>
                                        </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div>
                    <button className="border bg-slate-800 p-3 rounded-xl text-white border-slate-800 deleteButton mt-4" onClick={((e) => removeTodo(todo._id))}>Delete</button>
                </div>

                
            </div>
            <div>
                {/* <button className="border bg-slate-800 p-3 rounded-xl text-white border-slate-800 deleteButton" onClick = {() => {handleRemove(messageList)}}>Delete</button> */}
            </div>
        </>
    );
};

export default OneTodo;

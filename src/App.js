/* eslint-disable array-callback-return */
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

import List from "./Components/List";
import Alert from './Components/Alert';

import './App.css';
import { BsFillCheckCircleFill, BsXCircleFill } from "react-icons/bs";

function App() {
    const [taskName, setTaskName] = useState("")
    const [taskList, setTaskList] = useState([])

    const [alertList, setAlertList] = useState([])

    useEffect(() => {
        if(alertList.length > 11) {
            removeAlert()
        }
    })

    const submitData = (e) => {
        e.preventDefault()

        if(!taskName) {
            setAlertList([...alertList, setNewAlert(<BsXCircleFill/>, "Please fill the blank.", "error")])
        } else {
            const newItem = {
                id: uuidv4(),
                title: taskName,
                isEdit: false
            }
            setTaskList([...taskList, newItem])
            setAlertList([...alertList, setNewAlert(<BsFillCheckCircleFill/>, "Add new task completed.", "success")])
        }
        
    }

    const removeItem = (id) => {
        const taskListResult = taskList.filter((item) => item.id !== id)
        setTaskList(taskListResult)
        setAlertList([...alertList, setNewAlert(<BsFillCheckCircleFill/>, "Delete task completed.", "success")])
    }

    const editTaskText = (taskText, id) => {
        const editTask = taskList.map(item => {
            if (item.id === id) {
                return {...item, title: taskText};
            }
            return item;
        });
        setTaskList(editTask)
    }

    const editItem = (id) => {
        setIsEditTask(id, true)
        console.log("Edit")
    }

    const updateItem = (id) => {
        const searchItem = taskList.find((item) => item.id === id)

        if(!searchItem.title) {
            setAlertList([...alertList, setNewAlert(<BsXCircleFill/>, "Please fill the blank.", "error")])
        } else {
            setIsEditTask(id, false)
            setAlertList([...alertList, setNewAlert(<BsFillCheckCircleFill/>, "Edit task completed.", "success")])
        }
        console.log("Update")
    }

    const setIsEditTask = (id, boolean) => {
        const editTask = taskList.map(item => {
            if (item.id === id) {
                return {...item, isEdit: boolean};
            }
            return item;
        });
        setTaskList(editTask)
    }

    const removeAlert = () => {
        const alertListShift = alertList.slice(1)
        setAlertList(alertListShift)
    }

    const setNewAlert = (icon, message, type) => {
        const newAlert = {
            id: uuidv4(),
            icon: icon,
            message: message,
            type: type
        }

        return newAlert
    }

    return (
        <div className="container">
            <section className="todo-form">
                <h1>TodoList App</h1>
                <form className="form-group"onSubmit={submitData}>
                    <div className="form-control">
                        <input className="text-input" type="text" 
                            onChange={(e) => {
                                setTaskName(e.target.value)
                            }}
                            value={taskName}
                        />
                        <button className="submit-button" type="submit">+ New task</button>
                    </div>
                </form>
            </section>

            <section className="todo-list">
                {taskList.map((data, index) => 
                    <List key={index} {...data} 
                        editItem={editItem} 
                        updateItem={updateItem}
                        removeItem={removeItem} 
                        editTaskText={editTaskText}
                    />
                )}
            </section>

            <section className="alert-list">
                {alertList.map((data, index) => 
                    <Alert key={index} {...data} taskList={taskList} removeAlert={removeAlert}/>
                )}
            </section>
        </div>
    );
}

export default App;


import { getTasks, createTask, updateTask, deleteTask, isUserAuthenticated } from '../libs/api';
import moment from 'moment';
import React, { useState, useEffect, useRef } from 'react';
import {useNavigate } from 'react-router-dom'


const TaskForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('To Do');
    const [dueDate, setDueDate] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [useFormAction, setUseFormAction] = useState('Create');
    const [taskId, setTaskId] = useState('');
    const inputRef = useRef(null)
    const [search, setSearch] = useState('');

    const history = useNavigate();

    useEffect(() => {
        if (!isUserAuthenticated()) {
            return history('/LOGIN');
        }
        fetchTasks();
    }, []);


    const [tasks, setTasks] = useState([]);


    const handleDeleteTask = async (taskId) => {
        var result = window.confirm("Want to delete?");
        if (!result) return
        try {
            await deleteTask(taskId);
            const updatedTasks = tasks.filter(task => task.id !== taskId);
            setTasks(updatedTasks);
            console.log('Task deleted:', taskId);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleCreateTask = async () => {
        try {
            if (useFormAction === 'Update') {
                handleUpdateTask();
                return;
            }
            // validate task details
            if (!name || !description || !dueDate) {
                setError('Please enter all fields.');
                return;
            }

            const task = {
                name,
                description,
                dueDate
            };

            await createTask(task);
            setStatus("Task Created Successfully")
            reset()
            fetchTasks();
        } catch (error) {
            console.error('Error creating task:', error);
            setError('Error creating task. Please try again.');
        }
    };

    // UPDATE TASK
    const handleUpdateTask = async () => {
        try {
            const task = {
                name,
                description,
                status,
                dueDate
            };
            await updateTask(taskId, task);

            setSuccess('Task Updated Successfully');
            reset()
            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const fetchTasks = async (search) => {
        // Call the getTasks API function
        try {
            const tasks = await getTasks(search);
            setTasks(tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }

    }
    const setForUpdate = (taskId) => {
        const task = tasks.find(task => task._id === taskId);
        setName(task.name);
        setDescription(task.description);
        setStatus(task.status);
        setDueDate(moment(task.dueDate).format('YYYY-MM-DD'));
        setUseFormAction('Update');
        setTaskId(taskId);
        inputRef.current.focus();
    }
    const reset = () => {
        setName('');
        setDescription('');
        setStatus('To Do');
        setDueDate('');
        setUseFormAction('Create');
        setTaskId('');
        setSuccess('');
        setError('');
    }

    const handleSearch = (e) => {

        setSearch(e.target.value)

    }
    const handleKeyDown = (e) => {
                // check if enter key is pressed
                var code = (e.keyCode ? e.keyCode : e.which);
                console.log(code)
                if (code === 13) fetchTasks(search)
    }
    return (

        <div className="tasks">
            <div id="taskManager" className="cont">
                <input ref={inputRef}
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                    <option value="Hold">Hold</option>
                </select>

                <input
                    type="date"
                    placeholder="Due Date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <span className='redText'>{error}</span>
                <span>{success}</span>
                <br />
                <button className="buttonMain" onClick={handleCreateTask}>{useFormAction}</button>
                {(() => {
                    if (useFormAction == 'Update') {
                        return <button className='cancel-btn' onClick={reset}>Cancel</button>

                    }
                })()}

            </div>


            <h2>Tasks</h2>
            <input type='text' placeholder='Search Task by Name, description or Status' className='search' onKeyDown={handleKeyDown} onChange={handleSearch} />
            <button className='search-btn' onClick={() => {
                fetchTasks(search)
            }}>Search</button>

            {tasks.map(task => (
                <div key={task._id} className={task.status.replaceAll(' ', '') + " cont"}>
                    <p><b>Name</b>: {task.name}</p>
                    <p><b>Description</b>: {task.description}</p>
                    <p><b>Status</b>: <span className={task.status.replaceAll(' ', '')}>{task.status}</span></p>

                    <p><b>Due Date</b>: {moment(task.dueDate).format('YYYY-MM-DD HH:mm')}</p>

                    {(() => {
                        if (useFormAction === 'Update' && taskId === task._id) {
                            return <span className='editing'>Editing ......</span>

                        }
                        else {
                            return <><button className='red delete' onClick={() => handleDeleteTask(task._id)} title="Delete">X</button>
                                <button className='update' onClick={() => setForUpdate(task._id)}>Update</button></>
                        }
                    })()}
                </div>
            ))}

        </div>
    );
};

export default TaskForm;
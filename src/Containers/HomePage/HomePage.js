import React, { useState, useEffect } from 'react';
import UserCard from '../../Components/UserCard/UserCard'
import Grid from '@material-ui/core/Grid'
import NavBar from '../../Components/NavBar/NavBar'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '../../Components/Modal/Modal'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import { CircularProgress } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    NavBar: {
        marginBottom: "5rem"
    },
    Grid: {
        width: "80vw",
        margin: "auto"
    },
    circularProgress: {
        marginTop: "45vh",
        marginLeft: "45vw"
    }
}));

const HomePage = () => {

    const [addUserModelOpen, setAddUserModelOpen] = useState(false);
    const [addTaskModelOpen, setAddTaskModelOpen] = useState(false);
    const [updateTaskModelOpen, setUpdateTaskModelOpen] = useState(false);
    const [updateUserModelOpen, setUpdateUserModelOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState({ username: null, task: null });
    const [Tasks, setTasks] = useState([]);
    const [modelField, setModelField] = useState('');
    const [userIdTask, setUserIdTask] = useState('');

    const classes = useStyles();

    const fetchUsers = async () => {
        setLoading(true)
        const userData = await axios.get('https://user-task-raghav.herokuapp.com/users')
        const tasksData = await axios.get('https://user-task-raghav.herokuapp.com/task')
        const users = userData.data;
        const tasks = tasksData.data;


        const data = users.reduce((acc, item) => {
            return [...acc, {
                username: item.name, id: item._id, tasks: tasks.reduce((acc, task) => {
                    return task.owner === item._id ? [...acc, { task: task.taskName, id: task._id }] : [...acc]
                }, [])
            }]
        }, [])
        setTasks(data)
        setLoading(false)
    }


    const deleteUser = async (id) => {
        const response = await axios.delete(`https://user-task-raghav.herokuapp.com/users/${id}/`)
        console.log(response.status)
        if (response.status === 200) {
            fetchUsers()
        }
        console.log(response)
    }

    const deleteTask = async (id) => {
        const response = await axios.delete(`https://user-task-raghav.herokuapp.com/task/${id}/`)
        console.log(response.status)
        if (response.status === 200) {
            fetchUsers()
        }
        console.log(response)
    }

    const addUser = async (item) => {

        const userData = { name: item }

        const response = await axios.post(`https://user-task-raghav.herokuapp.com/users/`, userData)
        console.log(response.status)
        if (response.status === 201) {
            fetchUsers()
        }
        console.log(response)
        setAddUserModelOpen(false)
    }

    const addTask = async (item) => {
        console.log(item, userIdTask)
        const taskData = { taskName: item, owner: userIdTask }

        const response = await axios.post(`https://user-task-raghav.herokuapp.com/task/`, taskData)
        console.log(response.status)
        if (response.status === 201) {
            fetchUsers()
        }
        console.log(response)
        setAddTaskModelOpen(false)
    }

    const updateUser = async (item) =>{
        console.log(item, userIdTask)
        const userData = {name:item}

        const response = await axios.put(`https://user-task-raghav.herokuapp.com/users/${userIdTask}/`, userData)
        console.log(response.status)
        if (response.status === 201) {
            fetchUsers()
        }
        console.log(response)
        setUpdateUserModelOpen(false)
    }
 
    const updateTask = async (item) => {
        console.log(item, userIdTask)
        const taskData = { taskName: item }

        const response = await axios.put(`https://user-task-raghav.herokuapp.com/task/${userIdTask}/`, taskData)
        console.log(response.status)
        if (response.status === 201) {
            fetchUsers()
        }
        console.log(response)
        setUpdateTaskModelOpen(false)
    }

    const closeAddUserModal = () => {
        setAddUserModelOpen(prevState => !prevState);
    }

    const closeAddTaskModal = () => {
        setAddTaskModelOpen(prevState => !prevState);
    }

    const addTaskHandler = (id) => {
        setUserIdTask(id)
        closeAddTaskModal()
    }

    const closeUpdateTaskModel = () => {
        setUpdateTaskModelOpen(prevState => !prevState)
    }

    const updateTaskHandler = (task_id) => {
        setUserIdTask(task_id)
        closeUpdateTaskModel()
    }

    const closeUpdateUserModel = () =>{
        setUpdateUserModelOpen(prevState => !prevState)
    }

    const updateUserHandler = (user_id) => {
        setUserIdTask(user_id)
        closeUpdateUserModel()
    }


    useEffect(() => {
        fetchUsers();
    }, [])

    const loadingDiv = (
        <div>
            <CircularProgress className={classes.circularProgress} />
        </div>
    )

    const mainDiv = (
        <div className={classes.Grid}>
            <Grid container spacing={3}>
                {Tasks.map(item => {

                    return (<Grid item xs={12} md={6} lg={4}>
                        <UserCard id={item.id} onDelete={deleteUser} username={item.username} tasks={item.tasks}
                            setUserId={setUserId} userId={userId} deleteTask={deleteTask} onAddTask={addTask} handleAddTaskModal={addTaskHandler}
                            handleUpdateTaskModal = {updateTaskHandler} handleUpdateUserModal = {updateUserHandler}
                        />
                    </Grid >)
                })}

            </Grid>
            <Modal open={addUserModelOpen} onCancelAction={closeAddUserModal} title="Add User" onConfirmAction={addUser} modelText={modelField}>
                <TextField size="small" id="outlined-basic" label="Name" variant="outlined" onChange={event => setModelField(event.target.value)} value={modelField} />
            </Modal>

            <Modal open={addTaskModelOpen} title="Add task for user" onCancelAction={closeAddTaskModal} onConfirmAction={addTask} modelText={modelField}>
                <TextField size="small" id="outlined-basic" label="Name" variant="outlined" onChange={event => setModelField(event.target.value)} value={modelField} />
            </Modal>

            <Modal open={updateTaskModelOpen} title="Update task for user" onCancelAction={closeUpdateTaskModel} onConfirmAction={updateTask} modelText={modelField}>
                <TextField size="small" id="outlined-basic" label="Name" variant="outlined" onChange={event => setModelField(event.target.value)} value={modelField} />
            </Modal>
            
            <Modal open={updateUserModelOpen} title="Update User Name" onCancelAction={closeUpdateUserModel} onConfirmAction={updateUser} modelText={modelField}>
                <TextField size="small" id="outlined-basic" label="Name" variant="outlined" onChange={event => setModelField(event.target.value)} value={modelField} />
            </Modal>

        </div>
    )
 
    return (

        <div>
            <div className={classes.NavBar}>
                <NavBar buttonAction={closeAddUserModal} />
            </div>

            {!loading ? mainDiv : loadingDiv}



        </div>
    )
}


export default HomePage;

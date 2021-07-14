import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import Close from "@material-ui/icons/Close";
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import EditIcon from '@material-ui/icons/Edit';
import { Draggable, Droppable } from 'react-drag-and-drop'

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    minWidth: 275,
    borderTop: `2px solid green`,
  },
  addButton: {
    edgeEnd: 'true'
  }
});

const UserCard = ({ onDrop, username, tasks, id, onDeleteUser, deleteTask, handleAddTaskModal, handleUpdateTaskModal, handleUpdateUserModal,
  handleDeleteUserModal }) => {

  const classes = useStyles();

  return (
    <Droppable onDrop={(data) => onDrop(data, id)} types={['task', 'id']}>
      <div>

        <Card className={classes.root}>
          <CardHeader
            action={
              <React.Fragment>
                <IconButton aria-label="Edit User" onClick={() => handleUpdateUserModal(id)}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="Delete User" onClick={() => handleDeleteUserModal(id)}>
                  <Close />
                </IconButton>
              </React.Fragment>
            }
            title={username}
          ></CardHeader>
          <CardContent>

            <List>

              {tasks.map((item) => {
                return (
                  <Draggable key={item.id} type="task" data={item.task}>
                    <div >
                      <Draggable type="id" data={item.id}>
                        <ListItem key={item.id}>
                          <ListItemText primary={item.task} />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete task" onClick={() => deleteTask(item.id)}>
                              <DeleteIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="Edit task" onClick={() => handleUpdateTaskModal(item.id)}>
                              <EditIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </Draggable>
                    </div>
                  </Draggable>



                );
              })}

            </List>
          </CardContent>
          <IconButton className={classes.addButton} onClick={() => handleAddTaskModal(id)}>
            <AddIcon />
          </IconButton>
        </Card>
      </div>
    </Droppable>
  );
};

export default UserCard;

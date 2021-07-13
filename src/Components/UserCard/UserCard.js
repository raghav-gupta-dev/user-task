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

const UserCard = ({ username, tasks, setUserId, userId, changeTasks, onDelete, id, deleteTask, onAddTask, modelText, handleAddTaskModal,
  handleUpdateTaskModal, handleUpdateUserModal}) => {

  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          action={
            <React.Fragment>
              <IconButton aria-label="Edit User" onClick={() => handleUpdateUserModal(id)}>
                <EditIcon />
              </IconButton>
              <IconButton aria-label="Delete User" onClick={() => onDelete(id)}>
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
                <div>
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
                </div>

              );
            })}
          </List>
        </CardContent>
        <IconButton className={classes.addButton} onClick={() => handleAddTaskModal(id)}>
          <AddIcon />
        </IconButton>
      </Card>
    </div>
  );
};

export default UserCard;

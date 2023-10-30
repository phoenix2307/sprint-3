import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

type TaskWithReduxPT = {
    task: TaskType
    todolistId: string
}

export const TaskWithRedux: React.FC<TaskWithReduxPT> = memo(
    ({
         task,
         todolistId
     }, ...rest) => {

        const dispatch = useDispatch()

        const removeTask = () => dispatch(removeTaskAC(task.id, todolistId))

        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            dispatch(changeTaskStatusAC(task.id, newIsDoneValue, todolistId))
        }

        const changeTaskTitle =(newValue: string) => {
            dispatch(changeTaskTitleAC(task.id, newValue, todolistId))
        }


        return (
            <div className={task.isDone ? "is-done" : ""}>
                <Checkbox
                    checked={task.isDone}
                    color="primary"
                    onChange={changeTaskStatus}
                />

                <EditableSpan value={task.title}
                              onChange={changeTaskTitle}/>
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </div>
        );
    }
)
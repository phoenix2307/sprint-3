import React, {ChangeEvent, memo} from 'react';
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type TaskPT = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, newValue: string) => void
}

export const Task: React.FC<TaskPT> = memo(
    ({
         task,
         removeTask,
        changeTaskStatus,
        changeTaskTitle
     }, ...rest) => {

        const onClickHandler = () => removeTask(task.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            changeTaskStatus(task.id, newIsDoneValue);
        }
        const onTitleChangeHandler = (newValue: string) => {
            changeTaskTitle(task.id, newValue);
        }

        return (
            <div className={task.isDone ? "is-done" : ""}>
                <Checkbox
                    checked={task.isDone}
                    color="primary"
                    onChange={onChangeHandler}
                />

                <EditableSpan value={task.title}
                              onChange={onTitleChangeHandler}/>
                <IconButton onClick={onClickHandler}>
                    <Delete/>
                </IconButton>
            </div>
        );
    }
)
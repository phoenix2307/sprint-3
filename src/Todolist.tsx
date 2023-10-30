import React, {memo, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {MemoButton} from "./MemoButton";
import {changeTodolistFilterAC} from "./state/todolists-reducer";
import {useDispatch} from "react-redux";
import {Task} from "./Task";
import {TaskWithRedux} from "./TaskWithRedux";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    // tasks: TasksStateType
    removeTask: (taskId: string, todolistId: string) => void
    // changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = memo((props: PropsType) => {
    // console.log('Todolist')

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id);
    }, [props.removeTodolist, props.id])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTodolistTitle, props.id])

    //

    const dispatch = useDispatch()
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])

    //

    const onAllClickHandler = useCallback(() => changeFilter("all", props.id),
        [changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => changeFilter("active", props.id),
        [changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => changeFilter("completed", props.id),
        [changeFilter, props.id]);

    /* filter for tasks */
    let allTodolistTasks = props.tasks;
    let tasksForTodolist = allTodolistTasks;

    if (props.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
    }
    /*---------------------------------------------------------------------*/

    const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.id), [props.removeTask, props.id])
    const changeTaskStatus = useCallback((taskId: string, isDone: boolean) => {
        props.changeTaskStatus(taskId, isDone, props.id);
    }, [props.changeTaskStatus, props.id])
    const changeTaskTitle = useCallback((taskId: string, newValue: string) => {
        props.changeTaskTitle(taskId, newValue, props.id);
    }, [props.changeTaskTitle, props.id])


    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => {

                    return (

                        <TaskWithRedux task={t} todolistId={props.id}/>

/*                        <Task
                            key={t.id}
                            task={t}
                            removeTask={removeTask}
                            changeTaskStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}/>*/

                        /*                        <div key={t.id} className={t.isDone ? "is-done" : ""}>
                                                    <Checkbox
                                                        checked={t.isDone}
                                                        color="primary"
                                                        onChange={onChangeHandler}
                                                    />

                                                    <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                                                    <IconButton onClick={onClickHandler}>
                                                        <Delete/>
                                                    </IconButton>
                                                </div>*/
                    )

                })
            }
        </div>
        <div>
            <MemoButton variant={props.filter === 'all' ? 'outlined' : 'text'}
                        onClick={onAllClickHandler}
                        color={'inherit'}
                        nameButton={'All'}/>

            <MemoButton variant={props.filter === 'active' ? 'outlined' : 'text'}
                        onClick={onActiveClickHandler}
                        color={'primary'}
                        nameButton={'Active'}/>

            <MemoButton variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler}
                        color={'secondary'}
                        nameButton={'Completed'}/>
            {/*
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>*/}
        </div>
    </div>
})




/* eslint-disable no-console */

import React from 'react';
import { InputComponent } from './InputComponent';
import { TodoList } from './TodoList';
import appActions from '../../actions/AppActions';
import AppStore from '../../stores/AppStore';

export class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskList: []
        };
    }

    componentWillMount() {
        AppStore.addChangeListener('STORE_GET_INIT_TASK_LIST', this.setTaskList.bind(this));
        this.getTodoList();
    }
    componentDidMount() {
        AppStore.addChangeListener('STORE_ADD_TASK', this.getTodoList.bind(this));
        AppStore.addChangeListener('STORE_REMOVE_TASK', this.getTodoList.bind(this));
        AppStore.addChangeListener('STORE_MARK_TASK_DONE', this.getTodoList.bind(this));
    }
    getTodoList() {
        appActions.getInitTaskList();
    }
    setTaskList(list) {
        this.setState({
            taskList: list
        });
    }
    submitNewTask(newTask) {
        appActions.addNewTask(newTask);
    }
    deleteTask(taskToBeDeleted) {
        appActions.removeTask(taskToBeDeleted);
    }
    markTaskDone(doneTask) {
        appActions.markTaskDone(doneTask);
    }

    render() {
        return (
            <div>
                <InputComponent submitTask={this.submitNewTask.bind(this)} toDoText="" />
                <TodoList taskList={this.state.taskList}
                    taskDone={this.markTaskDone.bind(this)}
                    taskDelete={this.deleteTask.bind(this)} />
            </div>
        );
    }
}
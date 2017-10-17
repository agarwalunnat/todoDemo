/* eslint-disable no-console */

import React from 'react';

export class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.divStyle = {
            border: '1px solid GREY',
            width: '250px',
            margin: '5px',
            padding: '5px'
        };
        this.completedTaskStyle = {
            textDecoration: 'line-through'
        };
    }
    deleteTask(task) {
        this.props.taskDelete(task);
    }
    markTaskDone(task) {
        this.props.taskDone(task);
    }
    render() {
        console.log(this.props.taskList);
        return (
            <div>
                <div>{this.props.taskList.map((task) => <div style={this.divStyle}>
                    <li style={task.completed ? this.completedTaskStyle : null}>{task.title}</li>
                    <button
                        className="btn btn-primary"
                        onClick={this.markTaskDone.bind(this, task)}
                        style={task.completed ? { display: 'none' } : null}>DONE</button>
                    <button className="btn btn-default" onClick={this.deleteTask.bind(this, task)}>DELETE</button>
                </div>)}</div>
            </div>
        );
    }
}
TodoList.propTypes = {
    taskList: React.PropTypes.array,
    taskDone: React.PropTypes.func,
    taskDelete: React.PropTypes.func
};
import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';

let _list = [];

class AppStore extends EventEmitter {
    constructor() {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
    }
    getInitialTaskList(value, eventName) {
        fetch('/api/todos/', {
            method: 'GET'
        }).then(res => res.json()).then((list) => {
            _list = list;
            this.emit(eventName, _list);
        });
    }

    addTask(newTask, eventName) {
        fetch('/api/todos/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        }).then(res => res.json()).then((response) => {
            if (response.success) {
                this.emit(eventName);
            }
        });
        /*_list.push(newTask);
        this.emitChange(eventName, _list);*/
    }
    removeTask(taskToBeDeleted, eventName) {
        fetch(`/api/todos/${taskToBeDeleted.id}`, {
            method: 'DELETE'
        }).then(res => res.json()).then((response) => {
            if (response.success) {
                this.emit(eventName);
            }
        });
        /*if (_list.indexOf(taskToBeDeleted) !== -1) {
            _list.splice(_list.indexOf(taskToBeDeleted), 1);
            this.emitChange(eventName, _list);
        }*/
    }
    markTaskDone(newTask, eventName) {
        fetch(`/api/todos/${newTask.id}`, {
            method: 'PUT'
        }).then(res => res.json()).then((response) => {
            if (response.success) {
                this.emit(eventName);
            }
        });
        /*newTask.completed = true;
        this.emitChange(eventName, _list);*/
    }
    dispatcherCallback(action) {
        let eventName = 'STORE_' + action.actionType;
        switch (action.actionType) {
            case 'ADD_TASK':
                this.addTask(action.value, eventName);
                break;
            case 'REMOVE_TASK':
                this.removeTask(action.value, eventName);
                break;
            case 'MARK_TASK_DONE':
                this.markTaskDone(action.value, eventName);
                break;
            case 'GET_INIT_TASK_LIST':
                this.getInitialTaskList(action.value, eventName);
        }
        return true;
    }
    addChangeListener(eventName, callback) {
        this.on(eventName, callback);
    }

    removeChangeListener(eventName, callback) {
        this.removeListener(eventName, callback);
    }

}

export default new AppStore();

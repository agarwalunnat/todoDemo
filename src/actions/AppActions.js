//AppActions.js
import AppDispatcher from '../dispatcher/AppDispatcher';

class AppActions {
    addNewTask(newTask) {
        console.log('In Action:', 'Adding Task');
        AppDispatcher.dispatch({
            actionType: 'ADD_TASK',
            value: newTask
        });
    }
    removeTask(taskToBeDeleted) {
        console.log('In Action:', 'Removing Task');
        //fetch data success
        // async 
        // fect data succ
        AppDispatcher.dispatch({
            actionType: 'REMOVE_TASK',
            value: taskToBeDeleted
        });
    }
    markTaskDone(newTask) {
        console.log('In Action:', 'Marking Task Done');
        AppDispatcher.dispatch({
            actionType: 'MARK_TASK_DONE',
            value: newTask
        });
    }
    getInitTaskList() {
        console.log('In Action:', 'Getting Initial Task list');
        AppDispatcher.dispatch({
            actionType: 'GET_INIT_TASK_LIST',
            value: []
        });
    }

}

export default new AppActions();
 //Note: Using a new keyword 
                 //will make this work like a static class
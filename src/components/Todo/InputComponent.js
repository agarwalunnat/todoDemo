/* eslint-disable no-console */
import React from 'react';

export class InputComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toDoText: props.toDoText
        };
    }
    onHandleChange(event) {
        this.setState({
            toDoText: event.target.value
        });
    }
    onInputClicked() {
        this.setState({
            toDoText: ""
        });
        this.props.submitTask({
            title: this.state.toDoText,
            completed: false
        });
        // this.props.submitTask(this.state.toDoText);
    }
    render() {
        return (
            <div>
                <input type="text" value={this.state.toDoText} onChange={(event) => this.onHandleChange(event)}></input>
                <button className="btn btn-default" onClick={this.onInputClicked.bind(this)}>Submit</button>
            </div>
        );
    }
}

InputComponent.propTypes = {
    submitTask: React.PropTypes.func,
    toDoText: React.PropTypes.string
};
import React, { Component } from 'react'
import List from './List'

class ToDo extends Component {
    state = {
        tasks: [],
        inputValue: '',
    }

    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }

    addTask = () => {
        const { inputValue } = this.state;
        const newTasks = [...this.state.tasks]

        newTasks.push(inputValue)

        this.setState({
            tasks: newTasks,
            inputValue: ' ',
        })
    }


    render() {
        return (
            <div className='container'>
                <div className='sub-container'>
                    <input type='text' className='input-tag' placeholder='Add task here' value={this.state.inputValue} onChange={this.handleChange} />
                    <input type='button' className='add-task-button' value='Add' onClick={this.addTask} />
                </div>
                <ol className='my-list'>
                    {
                        this.state.tasks.map((task) => {
                            return <List data={task} />
                        })
                    }
                </ol>
            </div>
        )
    }
}

export default ToDo
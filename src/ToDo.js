import React, { PureComponent } from 'react'
import Task from './Task'
import EditTaskModal from './EditTaskModal'
import { Container, Col, Row, InputGroup, FormControl, Button } from 'react-bootstrap'
import idGenerator from './idGenerator'
import ConfirmDelete from './Modal'


class ToDo extends PureComponent {
    state = {
        tasks: [],
        inputValue: '',
        selectedTasks: new Set(),
        toggle: false,
        editTask: null
    }

    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }

    handleCheck = (id) => {
        const selectedTasks = new Set(this.state.selectedTasks)

        if (selectedTasks.has(id)) {
            selectedTasks.delete(id)
        } else {
            selectedTasks.add(id)
        }

        this.setState({
            selectedTasks
        })
    }

    toggleConfirm = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    toggleEditModal = (task) => {
        this.setState({
            editTask: task
        })
    }

    handleMultipleDelete = () => {
        console.log(this.state.selectedTasks)
        let tasks = [...this.state.tasks]
        this.state.selectedTasks.forEach((id) => {
            tasks = tasks.filter((task) => task._id !== id)
        })

        this.setState({
            tasks: tasks,
            selectedTasks: new Set(),
            toggle: false
        })
    }

    addTask = () => {
        const { inputValue } = this.state;
        if (!inputValue) {
            return;
        }
        const todoItem = {
            text: inputValue,
            _id: idGenerator()
        }
        const newTasks = [todoItem, ...this.state.tasks]

        this.setState({
            tasks: newTasks,
            inputValue: '',
        })
    }

    handleDelete = (id) => {
        const newArr = this.state.tasks.filter((el) => el._id !== id)

        this.setState({
            tasks: newArr
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.addTask()
        }
    }

    handleEdit = (task) => {
        this.setState({
            editTask: task
        })
    }

    f = (task) => {
        const changedItemIndex = this.state.tasks.findIndex((el) => el._id == task._id)
        const tasks = this.state.tasks
        tasks[changedItemIndex] = task


        this.setState({
            tasks: tasks,
            editTask: null
        })
    }

    render() {
        const { editTask } = this.state
        return (
            <div className='container'>
                <Container className='mt-4'>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder='Add task here'
                                    value={this.state.inputValue}
                                    onChange={this.handleChange}
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                    disabled={!!this.state.selectedTasks.size}
                                />
                                <InputGroup.Append>
                                    <Button
                                        variant="outline-secondary"
                                        onClick={this.addTask} disabled={!this.state.inputValue}
                                    >
                                        Add
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Button
                            variant='danger'
                            onClick={this.toggleConfirm}
                            disabled={this.state.selectedTasks.size === 0 ? true : false}
                        >
                            Delete
                        </Button>
                    </Row>
                </Container>
                <Row className='justify-content-center'>
                    {
                        this.state.tasks.map((task, i) => {
                            return <Task
                                data={task}
                                onRemove={this.handleDelete}
                                handleCheck={this.handleCheck}
                                onEdit={() => this.toggleEditModal(task)}
                            />
                        })
                    }
                </Row>
                <ConfirmDelete
                    count={this.state.selectedTasks.size}
                    toggle={this.state.toggle}
                    onClose={this.toggleConfirm}
                    delete={this.handleMultipleDelete}
                />
                {
                    !!this.state.editTask && <EditTaskModal
                        data={editTask}
                        onSave={(task) => this.f(task)} 
                        onClose={() => this.toggleEditModal(null)}/>
                }
            </div>
        )
    }
}

export default ToDo